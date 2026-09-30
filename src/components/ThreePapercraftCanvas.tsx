import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreePapercraftCanvasProps {
  isPaused?: boolean;
}

export const ThreePapercraftCanvas: React.FC<ThreePapercraftCanvasProps> = ({ isPaused = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.5, 8.5);

    // 2. High-Performance Clamped WebGL Renderer per /3d-web-experience
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 3. Warm Studio Craft Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ea, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const pinkRim = new THREE.DirectionalLight(0xff4fa3, 0.7);
    pinkRim.position.set(-6, -4, 4);
    scene.add(pinkRim);

    const limeRim = new THREE.DirectionalLight(0xc6ff3d, 0.6);
    limeRim.position.set(6, -5, 2);
    scene.add(limeRim);

    // 4. Procedural Morphing Origami Geometry
    // We define a 12-triangle facet mesh that morphs from a Flat Paper Sheet (p = 0)
    // through Center Crease (p = 0.35) and Corner Nose Folds (p = 0.7) to Dart Airplane (p = 1.0)
    const planeGeo = new THREE.BufferGeometry();
    const vertexCount = 18; // 6 triangles x 3 vertices
    const positions = new Float32Array(vertexCount * 3);
    planeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Tactile Matte Paper Material
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xf6f3ea,
      roughness: 0.85,
      metalness: 0.05,
      side: THREE.DoubleSide,
      flatShading: true,
    });

    const paperPlane = new THREE.Mesh(planeGeo, paperMat);
    paperPlane.scale.set(0.38, 0.38, 0.38);
    scene.add(paperPlane);

    // Crease Linework Overlay in Pencil Graphite
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x262a34,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.35,
    });
    const wireframe = new THREE.LineSegments(new THREE.WireframeGeometry(planeGeo), wireMat);
    paperPlane.add(wireframe);

    // Function to calculate geometry vertices based on fold progress p (0 to 1)
    const updateOrigamiGeometry = (p: number) => {
      // Clamped fold progress p: 0 = completely flat sheet, 1 = fully formed dart plane
      const t = Math.max(0, Math.min(1, p));

      // Key Origami Morph Points:
      // Nose Front
      const noseZ = 1.8 + 0.4 * t;
      const noseY = 0.05 * t;

      // Spine Rear
      const spineRearZ = -1.8 + 0.2 * t;
      const spineRearY = 0.15 * t;

      // Wing Tips
      const wingTipX = 2.4 - 0.2 * (1 - t);
      const wingTipY = 0.35 * t;
      const wingTipZ = -1.8 + 0.2 * t;

      // Corner Flaps (Fold inwards at t > 0.35)
      const cornerT = Math.max(0, Math.min(1, (t - 0.35) / 0.35));
      const leftCornerX = -2.2 + 2.2 * cornerT;
      const rightCornerX = 2.2 - 2.2 * cornerT;
      const cornerY = 0.1 * cornerT;

      // Keel Bottom (Pushes down at t > 0.65)
      const keelT = Math.max(0, Math.min(1, (t - 0.65) / 0.35));
      const keelY = -0.65 * keelT;
      const keelZ = -1.4;

      // Center fold spine V-angle
      const spineV = Math.sin(t * Math.PI * 0.8) * 0.25;

      const v: number[] = [
        // 1. Left Wing Top
        0, noseY, noseZ,
        -wingTipX, wingTipY, wingTipZ,
        0, spineRearY - spineV, spineRearZ,

        // 2. Right Wing Top
        0, noseY, noseZ,
        0, spineRearY - spineV, spineRearZ,
        wingTipX, wingTipY, wingTipZ,

        // 3. Left Keel Underbody
        0, noseY, noseZ,
        0, keelY, keelZ,
        -0.02, spineRearY, spineRearZ,

        // 4. Right Keel Underbody
        0, noseY, noseZ,
        0.02, spineRearY, spineRearZ,
        0, keelY, keelZ,

        // 5. Left Wing Underside
        0, keelY, keelZ,
        -wingTipX, wingTipY, wingTipZ,
        0, noseY, noseZ,

        // 6. Right Wing Underside
        0, noseY, noseZ,
        wingTipX, wingTipY, wingTipZ,
        0, keelY, keelZ,
      ];

      for (let i = 0; i < v.length; i++) {
        positions[i] = v[i];
      }

      planeGeo.attributes.position.needsUpdate = true;
      planeGeo.computeVertexNormals();

      // Only rebuild wireframe linework when fold changes significantly
      if (Math.abs(t - lastWireframeFold) > 0.04 || t >= 0.99 || t === 0) {
        wireframe.geometry.dispose();
        wireframe.geometry = new THREE.WireframeGeometry(planeGeo);
        lastWireframeFold = t;
      }
    };

    let lastWireframeFold = -1;
    let lastRenderedFold = -1;

    // Initialize with Flat Sheet (p = 0)
    updateOrigamiGeometry(0);

    // 5. Cursor Tracking Telemetry
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let prevTargetX = 0;

    const onPointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = x;
      targetY = y;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // 8. Scroll Telemetry
    let currentScroll = 0;
    const onScroll = () => {
      currentScroll = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Cache hero height to eliminate layout thrashing in animate loop
    let cachedHeroHeight = 850;
    const measureHeroHeight = () => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        cachedHeroHeight = heroEl.offsetHeight || 850;
      }
    };
    measureHeroHeight();

    // 9. Animation Loop with Dynamic Folding & Aerodynamic Banking
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let currentFoldProgress = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (isPausedRef.current) return;
      const elapsed = clock.getElapsedTime();

      // Smooth Cursor Interpolation with Aerodynamic Inertia
      const deltaX = targetX - prevTargetX;
      prevTargetX = targetX;
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Calculate normalized Hero fold progress using cached layout height
      const targetFold = Math.min(1, Math.max(0, currentScroll / (cachedHeroHeight * 0.75)));
      currentFoldProgress += (targetFold - currentFoldProgress) * 0.08;

      // Update the 3D origami folding geometry ONLY when fold progress changes
      if (Math.abs(currentFoldProgress - lastRenderedFold) > 0.002 && lastRenderedFold < 0.999) {
        updateOrigamiGeometry(currentFoldProgress);
        lastRenderedFold = currentFoldProgress;
      }

      const isPastHero = currentScroll > cachedHeroHeight * 0.85;

      // Responsive compact scale for the small origami airplane
      const isMobile = window.innerWidth < 768;
      const baseScale = isMobile ? 0.28 : 0.38;
      const currentScale = baseScale * (1.05 - currentFoldProgress * 0.15);
      paperPlane.scale.set(currentScale, currentScale, currentScale);

      // Base Floating Motion
      const floatBob = Math.sin(elapsed * 2.2) * 0.12;

      if (!isPastHero) {
        // --- HERO SECTION: Folding Center Stage ---
        // Positioned gracefully in hero right-center area
        const heroX = isMobile
          ? 0.75 + Math.sin(elapsed * 0.8) * 0.1
          : 1.6 + currentX * 0.4;
        const heroY = 0.1 + (isMobile ? 0 : currentY * 0.3) + floatBob - (currentScroll / cachedHeroHeight) * 0.7;

        paperPlane.position.x = heroX;
        paperPlane.position.y = heroY;
        paperPlane.position.z = -currentFoldProgress * 0.5;

        // Rotation transitions from tilted presentation sheet to banked plane
        paperPlane.rotation.x = 0.85 * (1 - currentFoldProgress) + 0.25 * currentFoldProgress - (isMobile ? 0 : currentY * 0.25);
        paperPlane.rotation.y = -0.45 + (isMobile ? Math.sin(elapsed * 0.5) * 0.15 : currentX * 0.35);
        paperPlane.rotation.z = 0.15 * (1 - currentFoldProgress) - (isMobile ? Math.cos(elapsed * 0.5) * 0.2 : deltaX * 2.0 + currentX * 0.2);
      } else {
        // --- SECTIONS 2-7: Free Flight Companion Mode ---
        if (isMobile) {
          // Autonomous Gentle Aerodynamic Patrol across upper-right margin
          const patrolX = 1.1 + Math.sin(elapsed * 0.45) * 0.35;
          const patrolY = -0.25 + Math.cos(elapsed * 0.65) * 0.2 + floatBob;

          paperPlane.position.x += (patrolX - paperPlane.position.x) * 0.05;
          paperPlane.position.y += (patrolY - paperPlane.position.y) * 0.05;
          paperPlane.position.z = -0.9;

          // Autonomous natural banking
          paperPlane.rotation.y = -Math.PI / 4 + Math.sin(elapsed * 0.45) * 0.2;
          paperPlane.rotation.x = 0.14 + Math.sin(elapsed * 2.2) * 0.04;
          paperPlane.rotation.z = -Math.cos(elapsed * 0.45) * 0.35;
        } else {
          // Desktop Cursor-Tracking Mode
          const flightTargetX = currentX * 2.5 + 1.2;
          const flightTargetY = currentY * 1.8 - 0.2 + floatBob;

          paperPlane.position.x += (flightTargetX - paperPlane.position.x) * 0.06;
          paperPlane.position.y += (flightTargetY - paperPlane.position.y) * 0.06;
          paperPlane.position.z = -0.8;

          paperPlane.rotation.y = -Math.PI / 4 + currentX * 0.55;
          paperPlane.rotation.x = 0.15 - currentY * 0.4 + Math.sin(elapsed * 2.5) * 0.05;
          paperPlane.rotation.z = -deltaX * 4.0 - currentX * 0.45;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      measureHeroHeight();
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
      planeGeo.dispose();
      wireframe.geometry.dispose();
      paperMat.dispose();
      wireMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
