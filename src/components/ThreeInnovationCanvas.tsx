import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeInnovationCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    // 2. Renderer setup with performance targets per /3d-web-experience
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xc6ff3d, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pinkLight = new THREE.DirectionalLight(0xff4fa3, 0.8);
    pinkLight.position.set(-5, -3, 3);
    scene.add(pinkLight);

    // 4. Central Geometric Innovation Prism (Multifaceted Polyhedron)
    const geometry = new THREE.IcosahedronGeometry(2.1, 0);

    // Physical Material with warm cream & subtle metallic reflection
    const material = new THREE.MeshStandardMaterial({
      color: 0x181b25,
      roughness: 0.35,
      metalness: 0.2,
      flatShading: true,
    });
    const mainMesh = new THREE.Mesh(geometry, material);
    scene.add(mainMesh);

    // Clean wireframe edge highlight matching DESIGN.md Acid Lime #C6FF3D
    const wireGeo = new THREE.WireframeGeometry(geometry);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xc6ff3d,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.45,
    });
    const wireframe = new THREE.LineSegments(wireGeo, wireMat);
    mainMesh.add(wireframe);

    // 5. Orbiting Satellites (Representing Student Initiatives & Repos)
    const satellites: THREE.Mesh[] = [];
    const satCount = 4;
    const satGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);

    const colors = [0xc6ff3d, 0xff4fa3, 0xffd84d, 0xf3efe3];

    for (let i = 0; i < satCount; i++) {
      const satMat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        roughness: 0.2,
        metalness: 0.1,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      scene.add(sat);
      satellites.push(sat);
    }

    // 6. Smooth Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.6;
      targetY = y * 0.4;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // 7. Scroll Listener to rotate on scroll
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate Main Mesh
      mainMesh.rotation.y = elapsedTime * 0.35 + mouseX + scrollY * 0.001;
      mainMesh.rotation.x = elapsedTime * 0.2 + mouseY;

      // Animate Orbiting Satellites
      satellites.forEach((sat, i) => {
        const angle = elapsedTime * 0.8 + (i * Math.PI * 2) / satCount;
        const radius = 3.2;
        sat.position.x = Math.cos(angle) * radius;
        sat.position.z = Math.sin(angle) * radius;
        sat.position.y = Math.sin(elapsedTime * 1.5 + i) * 0.75;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireGeo.dispose();
      wireMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};
