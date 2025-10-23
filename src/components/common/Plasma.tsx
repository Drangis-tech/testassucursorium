import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Plasma.css';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
  targetFPS?: number;
  resolutionScale?: number;
}

// Detect if device is mobile or low-end
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const isLowEndDevice = () => {
  const isSlowCPU = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
  const isSlowGPU = !window.WebGL2RenderingContext;
  return isMobile() || isSlowCPU || isSlowGPU;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  
  float alpha = length(rgb) * uOpacity;
  fragColor = vec4(finalColor, alpha);
}`;

export const Plasma: React.FC<PlasmaProps> = ({
  color = '#ffffff',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = true,
  targetFPS = 30,
  resolutionScale = 1
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    try {
      // Optimize settings based on device
      const lowEnd = isLowEndDevice();
      const mobile = isMobile();
      
      // Resolution scaling for mobile/low-end devices - balanced for quality and performance
      let actualResolutionScale = resolutionScale;
      if (mobile) {
        actualResolutionScale = resolutionScale * 0.4; // 40% resolution on mobile
      } else if (lowEnd) {
        actualResolutionScale = resolutionScale * 0.6; // 60% on low-end
      }
      
      // Ensure resolution scale maintains minimum quality
      actualResolutionScale = Math.max(actualResolutionScale, 0.3);

      // Disable mouse interaction on mobile for performance
      const actualMouseInteractive = mobile ? false : mouseInteractive;

      const useCustomColor = color ? 1.0 : 0.0;
      const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];

      const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;

      // Limit DPR more aggressively
      const maxDPR = mobile ? 1 : (lowEnd ? 1 : 1.5);

      const renderer = new Renderer({
        webgl: 2,
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        dpr: Math.min(window.devicePixelRatio || 1, maxDPR)
      });
      const gl = renderer.gl;
      
      if (!gl) {
        console.error('Plasma: WebGL context not available');
        return;
      }
      
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      
      if (containerRef.current) {
        containerRef.current.appendChild(canvas);
      }

      const geometry = new Triangle(gl);

      const program = new Program(gl, {
        vertex: vertex,
        fragment: fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new Float32Array([1, 1]) },
          uCustomColor: { value: new Float32Array(customColorRgb) },
          uUseCustomColor: { value: useCustomColor },
          uSpeed: { value: speed * 0.4 },
          uDirection: { value: directionMultiplier },
          uScale: { value: scale },
          uOpacity: { value: opacity },
          uMouse: { value: new Float32Array([0, 0]) },
          uMouseInteractive: { value: actualMouseInteractive ? 1.0 : 0.0 }
        }
      });

      const mesh = new Mesh(gl, { geometry, program });

      // Throttle mouse movement updates
      let lastMouseUpdate = 0;
      const mouseUpdateInterval = 50; // Update mouse position max every 50ms

      const handleMouseMove = (e: MouseEvent) => {
        if (!actualMouseInteractive) return;
        const now = performance.now();
        if (now - lastMouseUpdate < mouseUpdateInterval) return;
        lastMouseUpdate = now;
        
        const rect = containerRef.current!.getBoundingClientRect();
        mousePos.current.x = e.clientX - rect.left;
        mousePos.current.y = e.clientY - rect.top;
        const mouseUniform = program.uniforms.uMouse.value as Float32Array;
        mouseUniform[0] = mousePos.current.x;
        mouseUniform[1] = mousePos.current.y;
      };

      if (actualMouseInteractive) {
        containerRef.current.addEventListener('mousemove', handleMouseMove, { passive: true });
      }

      const setSize = () => {
        const rect = containerRef.current!.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width * actualResolutionScale));
        const height = Math.max(1, Math.floor(rect.height * actualResolutionScale));
        renderer.setSize(width, height);
        const res = program.uniforms.iResolution.value as Float32Array;
        res[0] = gl.drawingBufferWidth;
        res[1] = gl.drawingBufferHeight;
      };

      const ro = new ResizeObserver(setSize);
      ro.observe(containerRef.current);
      setSize();

      let raf = 0;
      const t0 = performance.now();
      let lastFrameTime = 0;
      const frameInterval = 1000 / targetFPS;
      
      const loop = (t: number) => {
        raf = requestAnimationFrame(loop);
        
        // Throttle frame rate
        const elapsed = t - lastFrameTime;
        if (elapsed < frameInterval) {
          return;
        }
        lastFrameTime = t - (elapsed % frameInterval);

        let timeValue = (t - t0) * 0.001;

        if (direction === 'pingpong') {
          const cycle = Math.sin(timeValue * 0.5) * directionMultiplier;
          (program.uniforms.uDirection as any).value = cycle;
        }

        (program.uniforms.iTime as any).value = timeValue;
        renderer.render({ scene: mesh });
      };
      raf = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        if (actualMouseInteractive && containerRef.current) {
          containerRef.current.removeEventListener('mousemove', handleMouseMove);
        }
        try {
          if (containerRef.current && canvas.parentNode === containerRef.current) {
            containerRef.current.removeChild(canvas);
          }
        } catch (e) {
          console.log('Plasma cleanup error:', e);
        }
      };
    } catch (error) {
      console.error('Plasma: Error during initialization', error);
    }
  }, [color, speed, direction, scale, opacity, mouseInteractive, targetFPS, resolutionScale]);

  return <div ref={containerRef} className="plasma-container" />;
};

export default Plasma;

