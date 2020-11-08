var  wa_button = {
	"phone_number" : "",
	"init" : function(phone, message, title)
	{
		this.phone_number = phone;
		var wa_icon = '<svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39"><path fill="#00E676" d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"></path><path fill="#FFF" d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"></path></svg>';

		document.body.insertAdjacentHTML('beforeEnd', '<a id="wa_button" href="javascript:wa_button.show();">' + wa_icon + '</a>');
		document.body.insertAdjacentHTML('beforeEnd', '<div id="wa_button_popup"><a class="wa_close" href="javascript:wa_button.close()">×</a><span class="wa_title"></span><form onsubmit="return wa_button.submit()" id="wa_form"></form></div>');

		document.querySelector("#wa_button_popup .wa_title").innerText = title;

		document.getElementById("wa_form").insertAdjacentHTML('beforeEnd', '<label for="wa_message"></label><span></span>');
		document.querySelector("#wa_form > span").insertAdjacentHTML('beforeEnd', '<input id="wa_message" required >');
		document.querySelector("#wa_form > span").insertAdjacentHTML('beforeEnd', '<button type="submit"><svg width="20" height="18" style="isolation:isolate" version="1.1" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg"><path d="m0 0v7.813l16 1.187-16 1.188v7.812l20-9z" fill="#2e2e2e" style="fill:#808080"/></svg></button>');

		document.querySelector("label[for='wa_message']").innerText = message;

		
	},
	"show" : function()
	{
		document.body.classList.add("wa_show_popup");
	},
	"close" : function()
	{
		document.body.classList.remove("wa_show_popup");	
	},
	"submit" : function()
	{
		var wa_url = wa_query_vars = "phone=" + this.phone_number + "&text=" + encodeURIComponent(document.getElementById("wa_message").value);

		var wa_url = "https://web.whatsapp.com/send?" + wa_query_vars;

		if(/(iPhone|iPod)/.test(navigator.userAgent))
		{
			wa_url = "whatsapp://send?" + wa_query_vars;
		}
		else if(/android\s/i.test(navigator.userAgent))
		{
			wa_url = "intent://send?" + wa_query_vars + "#Intent;package=com.whatsapp;scheme=whatsapp;end&" + wa_query_vars;
		}

		window.location = wa_url;

		return false;
	}
}
