"use client";

import React, { useState } from "react";

const JobFormController = ({ user }: { user: { id: string } | null }) => {
  const [formData, setFormData] = useState({
    user_id: user?.id || "",
    shiftType: "",
    dispatchTime: "",
    clearTime: "",
    composition: "",
    type: "",
    response: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dispatch = new Date(formData.dispatchTime);
    const clear = new Date(formData.clearTime);

    if (dispatch > clear) {
      alert("Dispatch Time cannot be after Clear Time.");
      return;
    }

    //

    try {
      const response = await fetch("/api/inngest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create job");
      alert("Job created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting job.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Shift Type"
        name="shiftType"
        value={formData.shiftType}
        onChange={handleChange}
      />
      <Input
        label="Dispatch Time"
        name="dispatchTime"
        type="datetime-local"
        value={formData.dispatchTime}
        onChange={handleChange}
      />
      <Input
        label="Clear Time"
        name="clearTime"
        type="datetime-local"
        value={formData.clearTime}
        onChange={handleChange}
      />
      <Input
        label="Composition"
        name="composition"
        value={formData.composition}
        onChange={handleChange}
      />
      <Input
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
      />
      <Input
        label="Response"
        name="response"
        value={formData.response}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
      >
        Submit Job
      </button>
    </form>
  );
};

type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
};

const Input = ({ label, name, value, onChange, type = "text" }: InputProps) => (
  <div>
    <label className="block text-sm font-medium mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

export default JobFormController;
