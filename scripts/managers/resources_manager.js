class ResourcesManager
{
	static init()
	{
		this.textures_list = {}
	}
	
	static loadTexture(name, path)
	{
		this.textures_list[name] = new Image()
		this.textures_list[name].src = path
	}
	
	static getTexture(name)
	{
		return this.textures_list[name]
	}
}
