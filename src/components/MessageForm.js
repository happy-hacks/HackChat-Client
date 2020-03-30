import React, { useState } from 'react';

// libraries
import { useLocation } from 'react-router-dom';

const MessageForm = ({ socket }) => {
	const [message, setMessage] = useState('');
	const handle = useLocation().state.handle;

	const onSubmit = (event) => {
		event.preventDefault();
		if (message) socket.emit('chat', { message, handle, id: socket.id });
		setMessage('');
	};

	const onTyping = (event) => {
		const keyCode = window.event.keyCode;

		if (keyCode === 13 && event.shiftKey) setMessage(message);
		else if (keyCode === 13) return onSubmit(event);
		socket.emit('typing', handle);
	};

	return (
		<form className="chat-input">
			<textarea
				className="chat-input__message"
				placeholder="message..."
				name="message"
				onChange={(event) => setMessage(event.target.value)}
				onKeyPress={(event) => onTyping(event)}
				value={message}
			/>
			<input className="chat-input__submit" type="submit" value="send" onClick={(event) => onSubmit(event)} />
		</form>
	);
};

export default MessageForm;
