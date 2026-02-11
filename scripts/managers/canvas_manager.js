class CanvasManager
{
	static init()
	{
		this.canvas = document.getElementById("game")
		this.context = this.canvas.getContext("2d")
		
		window.addEventListener("load", (event) =>
		{
			this.canvas.width = window.innerWidth
			this.canvas.height = window.innerHeight
		});
		
		window.addEventListener("resize", (event) =>
		{
			this.canvas.width = window.innerWidth
			this.canvas.height = window.innerHeight
		});
	}
	
	static clear()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}
	
	static drawImage(img, x, y, w, h)
	{
		//this.context.save()
		//this.context.translate(x, y)
		//this.context.rotate(angle)
		//this.context.translate(-x, -y)
		
		this.context.drawImage(img, x-w/2, y-h/2, w, h)
		
		//this.resetTransform()
	}
	
	static setCameraCenter(x, y)
	{	
		
		this.context.translate(-x + this.canvas.width/2, -y + this.canvas.height/2)
		console.log(-x + this.canvas.width/2, -y + this.canvas.height/2)
	}
	
	static resetTransform()
	{
		this.context.restore()
	}
}
