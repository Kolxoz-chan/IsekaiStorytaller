class MathManager
{
	static init()
	{
		
	}
	
	static lerp(a, b, coef)
	{
		return (b - a) * coef + a
	}
	
	static lerp_vector(point_a, point_b, coef)
	{
		return {
			x : (point_b.x - point_a.x) * coef + point_a.x,
			y : (point_b.y - point_a.y) * coef + point_a.y
		}
	}
}
