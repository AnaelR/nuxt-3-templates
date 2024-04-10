precision highp float;

#include colors.glsl;

varying vec3 vPosition;

void main()	{
  gl_FragColor = mix(blue,green,vPosition.y);
}
