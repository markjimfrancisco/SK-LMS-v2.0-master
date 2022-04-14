import { useEffect, useState } from "react";
import { usePostHttp } from "../hooks/postHttp";

const ContactForm = () => {
    const [toSubmit, setToSubmit] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [requestLoading, requestData] = usePostHttp(
        toSubmit ? { name: name, email: email, message: message } : null,
        toSubmit ? "/request/demo" : null
    );

    useEffect(() => {
        if (requestData) {
          setToSubmit(false);
          setName("");
          setEmail("");
          setMessage("");
          alert("Our representative will contact you soon. Thank you.");
        }
      }, [requestData]);
    
    return (
        <div className="space-y-4">
              <div>
                <label className="text-lg font-bold text-subheading">
                  Name:
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-subheading"
                  type="text"
                  placeholder="Ex. Juan Dela Cruz"
                />
              </div>
              <div>
                <label className="text-lg font-bold text-subheading">
                  Email:
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-subheading"
                  type="text"
                  placeholder="something@website.com"
                />
              </div>
              <div>
                <label className="text-lg font-bold text-subheading">
                  Message:
                </label>
                <br />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-subheading"
                ></textarea>
              </div>
              <input
                onClick={() => {
                  setToSubmit(true);
                }}
                className="w-full h-10 bg-blue-500 rounded-full text-white uppercase"
                type="submit"
                value={toSubmit ? "Sending your request..." : "Send a message"}
              />
        </div>
    )
};

export default ContactForm;