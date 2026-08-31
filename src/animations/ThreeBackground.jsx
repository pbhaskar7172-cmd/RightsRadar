import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground({ className = "absolute inset-0 w-full h-full" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Colors from Design System
    const colors = {
      navy: 0x0F2137,
      saffron: 0xE67E22,
      cream: 0xFDFCF8,
      beige: 0xD5CABD,
      white: 0xFFFFFF
    };

    // Groups for different scenes
    const group = new THREE.Group();
    scene.add(group);

    // Create Abstract Floating Document Planes
    const createFloatingDoc = (y) => {
      const geometry = new THREE.PlaneGeometry(1, 1.4);
      const material = new THREE.MeshPhongMaterial({ 
        color: colors.white, 
        transparent: true, 
        opacity: 0.6,
        side: THREE.DoubleSide 
      });
      const doc = new THREE.Mesh(geometry, material);
      doc.position.set(Math.random() * 10 - 5, y, Math.random() * 5 - 10);
      doc.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      return doc;
    };

    const docs = [];
    for (let i = 0; i < 15; i++) {
      const doc = createFloatingDoc(Math.random() * 6 - 3);
      group.add(doc);
      docs.push(doc);
    }

    // Connected Nodes (AI Network)
    const nodesGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const nodesMaterial = new THREE.MeshBasicMaterial({ color: colors.saffron });
    const nodes = new THREE.Group();
    const points = [];
    for (let i = 0; i < 20; i++) {
      const node = new THREE.Mesh(nodesGeometry, nodesMaterial);
      const pos = new THREE.Vector3(Math.random() * 8 - 4, Math.random() * 4 - 2, Math.random() * 4 - 8);
      node.position.copy(pos);
      nodes.add(node);
      points.push(pos);
    }
    group.add(nodes);

    // Lines between nodes
    const lineMaterial = new THREE.LineBasicMaterial({ color: colors.navy, transparent: true, opacity: 0.2 });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(line);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Animation state
    let time = 0;
    let animationFrameId;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = prefersReducedMotion ? 0.001 : 0.005;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      time += speed;

      group.rotation.y = Math.sin(time * 0.5) * 0.1;
      group.position.y = Math.sin(time) * 0.2;

      docs.forEach((doc, i) => {
        doc.rotation.x += (prefersReducedMotion ? 0.0005 : 0.002) * (i % 2 === 0 ? 1 : -1);
        doc.rotation.y += (prefersReducedMotion ? 0.0002 : 0.001);
        doc.position.y += Math.sin(time + i) * 0.005;
      });

      nodes.children.forEach((node, i) => {
        node.position.y += Math.cos(time + i) * 0.002;
      });

      renderer.render(scene, camera);
    }

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      nodesGeometry.dispose();
      nodesMaterial.dispose();
      docs.forEach(doc => {
        doc.geometry.dispose();
        doc.material.dispose();
      });
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={className} style={{ display: 'block' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
