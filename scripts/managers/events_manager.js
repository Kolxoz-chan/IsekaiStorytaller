class EventsManager
{	
	static init()
	{
		EventsManager.keys = {};
		EventsManager.buttons = {};
		EventsManager.mouse_x = 0;
		EventsManager.mouse_y = 0;
		
		document.addEventListener("keydown", EventsManager.onKeyDown);
		document.addEventListener("keyup", EventsManager.onKeyUp);
		document.addEventListener("mousedown", EventsManager.onMouseDown);
		document.addEventListener("mouseup", EventsManager.onMouseUp);
		document.addEventListener("mousemove", EventsManager.onMouseMove);
	}
	
	static onKeyDown(event)
	{
		EventsManager.keys[event.code] = true
	}
	
	static onKeyUp(event)
	{
		EventsManager.keys[event.code] = false
	}
	
	static onMouseDown(event)
	{
		EventsManager.mouse_x = event.clientX;
		EventsManager.mouse_y = event.clientY;
		EventsManager.buttons[event.button] = true
	}
	
	static onMouseUp(event)
	{
		EventsManager.mouse_x = event.clientX;
		EventsManager.mouse_y = event.clientY;
		EventsManager.buttons[event.button] = false
	}
	
	static onMouseMove(event)
	{
		EventsManager.mouse_x = event.clientX;
		EventsManager.mouse_y = event.clientY;
	}
	
	static isKeyPressed(code)
	{
		if(code in EventsManager.keys)
		{
			return EventsManager.keys[code];
		}
		return false
	}
	
	static isMousePressed(button)
	{
		if(button in EventsManager.buttons)
		{
			return EventsManager.buttons[button];
		}
		return false
	}
	
}
