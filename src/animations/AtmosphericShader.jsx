import { useEffect, useRef } from 'react';

export default function AtmosphericShader({
  className = "absolute inset-0 w-full h-full opacity-60 mix-blend-multiply pointer-events-none z-0",
  aiState = "idle"
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef(aiState);

  useEffect(() => {
    stateRef.current = aiState;
  }, [aiState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_glow_intensity;
uniform float u_noise_amp;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    vec2 center = u_mouse / u_resolution;
    if(u_mouse.x == 0.0) center = vec2(0.5);
    
    float dist = distance(uv, center);
    
    // Smooth organic noise-like movement modulated by AI state
    float noise = sin(uv.x * 10.0 + u_time) * cos(uv.y * 10.0 - u_time) * u_noise_amp;
    
    // Gradient colors from Nyaya AI palette
    vec3 colorNavy = vec3(0.059, 0.129, 0.216); // #0F2137
    vec3 colorCream = vec3(0.992, 0.988, 0.973); // #FDFCF8
    vec3 colorSaffron = vec3(0.902, 0.494, 0.133); // #E67E22
    
    // Ambient liquid field
    float liquid = smoothstep(0.4 + noise, 0.0, dist);
    vec3 color = mix(colorCream, colorNavy, liquid * 0.1);
    
    // State-reactive accent glow
    float glow = smoothstep(0.1 + noise, 0.0, dist);
    color = mix(color, colorSaffron, glow * u_glow_intensity);

    gl_FragColor = vec4(color, 1.0);
}`;

    function cs(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vertexShader = cs(gl.VERTEX_SHADER, vs);
    const fragmentShader = cs(gl.FRAGMENT_SHADER, fs);
    const prog = gl.createProgram();
    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uGlowIntensity = gl.getUniformLocation(prog, 'u_glow_intensity');
    const uNoiseAmp = gl.getUniformLocation(prog, 'u_noise_amp');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    let virtualTime = 0;
    let lastT = 0;

    function render(t) {
      if (!canvas) return;
      if (typeof ResizeObserver === 'undefined') syncSize();

      const delta = (t - lastT) * 0.001;
      lastT = t;

      const currentState = stateRef.current;
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let speedMultiplier = prefersReducedMotion ? 0.2 : 1.0;
      let targetGlow = 0.05;
      let targetAmp = prefersReducedMotion ? 0.005 : 0.02;

      if (currentState === 'listening') {
        speedMultiplier = prefersReducedMotion ? 0.4 : 2.5;
        targetGlow = 0.18;
        targetAmp = prefersReducedMotion ? 0.01 : 0.04;
      } else if (currentState === 'understanding') {
        speedMultiplier = prefersReducedMotion ? 0.3 : 2.0;
        targetGlow = 0.14;
        targetAmp = 0.035;
      } else if (currentState === 'analyzing') {
        speedMultiplier = 3.2;
        targetGlow = 0.32;
        targetAmp = 0.055;
      } else if (currentState === 'asking') {
        speedMultiplier = 1.2;
        targetGlow = 0.1;
        targetAmp = 0.025;
      } else if (currentState === 'responding') {
        speedMultiplier = 1.8;
        targetGlow = 0.22;
        targetAmp = 0.035;
      } else if (currentState === 'generating') {
        speedMultiplier = 4.0;
        targetGlow = 0.45;
        targetAmp = 0.07;
      }

      virtualTime += delta * speedMultiplier;

      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, virtualTime);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      if (uGlowIntensity) gl.uniform1f(uGlowIntensity, targetGlow);
      if (uNoiseAmp) gl.uniform1f(uNoiseAmp, targetAmp);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    render(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (gl) {
        gl.deleteBuffer(buf);
        gl.deleteProgram(prog);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      }
    };
  }, []);

  return (
    <div className={className} style={{ display: 'block' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
