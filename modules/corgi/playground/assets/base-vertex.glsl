precision highp float;

uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional
uniform float uTime;

attribute vec3 position;
attribute vec4 color;

varying vec3 vPosition;

void main()	{
  vPosition = position;

  vec3 p = position;
  p.y *= (cos(uTime) * 0.1) + 0.9;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
}
