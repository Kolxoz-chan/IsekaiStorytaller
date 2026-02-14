class CanvasManager
{
	static init()
	{
		this.canvas = document.getElementById("game")
		this.context = this.canvas.getContext("2d")
		this.camera = {x:0, y:0}
		
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
		this.context.drawImage(img, x - this.camera.x - w/2, y - this.camera.y - h/2, w, h)
	}
	
	static setCameraCenter(x, y)
	{	
		this.camera = {
			x : x - this.canvas.width / 20, 
			y : y - this.canvas.height / 20
		}
	}
}
