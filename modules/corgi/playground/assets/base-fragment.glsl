precision highp float;

#include colors.glsl;

uniform float uTime;

varying vec3 vPosition;

void main()	{
  gl_FragColor = mix(red,blue,cos(uTime * 0.5));
}
