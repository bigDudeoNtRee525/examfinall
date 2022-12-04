import { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../api/api";
import { getToken } from "./storage/Storage";
import { useNavigate } from "react-router-dom";
function NewPost() {
		const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
		const token = getToken()
		const navigate = useNavigate();

		async function submitRegister(title, body, media) {
			const url = BASE_URL + "/social/posts"
			const data = JSON.stringify({
				title: title,
				body: body,
				tags: [],
				media: media,
			});
			const headers = {
					method: "POST",
					body: data,
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					}
			};
			try {
					const res = await fetch(url, headers);
					const json = await res.json();
					navigate("/posts/" + json.id)
			} catch (error) {}
		}

	const onSubmit = (data) => {
		submitRegister(data.title, data.body, data.media)
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
		} = useForm();

  return (
    <div>
			<form className="flex flex-col items-center mb-[40px] bg-[#1A1919] px-[20px] py-[20px] rounded-[10px]" onSubmit={handleSubmit(onSubmit)}>
				<p className="text-[20px]">New post</p>
				<div className="flex flex-col w-full max-w-[450px]">
					<input placeholder="Title" {...register("title", {required: "Title is required"})} />
					<p>{errors.title?.message}</p>
					<input placeholder="Body" {...register("body")}/>
					<input placeholder="Media" {...register("media", {pattern: {
                        value: regex,
                        message: "needs to be a full link"
                    }})} />
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
  )
}

export default NewPost