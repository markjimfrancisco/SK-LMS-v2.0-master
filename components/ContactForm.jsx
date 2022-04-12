import React, { useState } from "react";

const ContactForm = () => {

    const [status, setStatus] = useState("Send a message");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending your request...");
        const { name, email, subject, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
        };

        let response = await fetch("http://localhost:3001/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        });
        setStatus("Send a message");
        let result = await response.json();
        alert(result.status);
        if (result.status == "Message Sent") {
            name.value="";
            email.value="";
            subject.value="";
            message.value="";
        } else {
            alert ("Something went wrong!")
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="space-y-4">
                <div>
                    <label className="text-lg font-bold text-subheading" htmlFor="name">
                    Name:
                    </label>
                    <input
                    className="w-full text-subheading"
                    type="text"
                    placeholder="Ex. Juan Dela Cruz"
                    id="name"
                    />
                </div>
            <div>
                <label className="text-lg font-bold text-subheading" htmlFor="email">
                Email:
                </label>
                <input
                    className="w-full border-subheading"
                    type="email"
                    id="email"
                    placeholder="something@website.com"
                />
            </div>
            <div>
                <label className="text-lg font-bold text-subheading" htmlFor="subject">
                Subject:
                </label>
                <input
                    className="w-full border-subheading"
                    type="text"
                    id="subject"
                    placeholder="Ex. Inquiry or Setup a Meeting"
                />
            </div>
            <div>
                <label className="text-lg font-bold text-subheading" htmlFor="message">
                Message:
                </label>
                <br />
                <textarea
                    className="w-full text-subheading" id="message"
                ></textarea>
            </div>
            <button className="w-full h-10 bg-blue-500 rounded-full text-white uppercase" type="submit">
                {status}
            </button>
            </div>
        </form>
        );
};

export default ContactForm;