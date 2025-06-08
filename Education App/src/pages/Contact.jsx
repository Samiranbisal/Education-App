import React from "react";
import { useForm } from "react-hook-form";
import "./Contact.css";

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Thank you for contacting us!");
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Your full name"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </label>

        <label>
          Email
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="you@example.com"
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </label>

        <label>
          Message
          <textarea
            rows="5"
            {...register("message", { required: "Message is required" })}
            placeholder="Your message"
          />
          {errors.message && <span className="error">{errors.message.message}</span>}
        </label>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
