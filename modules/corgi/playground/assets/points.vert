precision highp float;

uniform float uTime;
uniform float uSize;

varying vec3 vPosition;

void main()	{
  vPosition = position;

  gl_PointSize = uSize;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
