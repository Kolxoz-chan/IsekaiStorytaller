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
	
	static isPointInRect(point, rect)
	{
		return (rect.x <= point.x) && (point.x <= rect.x + rect.width) && (rect.y <= point.y) && (point.y <= rect.y + rect.height)
	}
	
	static isIntersectsRects(rect_1, rect_2)
	{
		let p1 = {x : rect_1.x, 				y : rect_1.y}
		let p2 = {x : rect_1.x + rect_1.width, 	y : rect_1.y}
		let p3 = {x : rect_1.x, 				y : rect_1.y + rect_1.height}
		let p4 = {x : rect_1.x + rect_1.width, 	y : rect_1.y + rect_1.height}
		
		return this.isPointInRect(p1, rect_2) || this.isPointInRect(p2, rect_2) || this.isPointInRect(p3, rect_2) || this.isPointInRect(p4, rect_2)
	}
	
	static pointsDistance(point_1, point_2)
	{
		let kat_1 = point_2.x - point_1.x
		let kat_2 = point_2.y - point_1.y
		
		return Math.sqrt(kat_1 * kat_1 + kat_2 * kat_2)
	}
	
	static moveTo(pos, target, speed)
	{
		let len = this.pointsDistance(pos, target)
		
		if(len > speed)
		{
			let dx = (target.x - pos.x) / len * speed
			let dy = (target.y - pos.y) / len * speed
			
			return {x : pos.x + dx, y : pos.y + dy}
		}
		return target
	}
}
