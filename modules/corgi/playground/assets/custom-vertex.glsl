uniform float uTime;

void main()	{
  csm_Position.y *= (cos(uTime) * 0.1) + 0.9;
}
