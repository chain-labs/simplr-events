"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { LabelMedium } from "./ui/label";

interface EmailNameModalProps {
  isOpen: boolean;
  onSubmit: (data: { name: string; email: string }) => void;
  onClose?: () => void; // Optional close handler
}

export default function EmailNameModal({
  isOpen,
  onSubmit,
  onClose,
}: EmailNameModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {
      name: name.trim() === "" ? "Name is required" : "",
      email: !email.includes("@") ? "Please enter a valid email" : "",
    };

    setErrors(newErrors);

    if (newErrors.name === "" && newErrors.email === "") {
      try {
        setIsSubmitting(true);
        await onSubmit({ name, email });
        
        // Reset form
        setName("");
        setEmail("");
        
        // Close the modal after successful submission
        if (onClose) {
          onClose();
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // This function is a no-op to prevent the modal from closing when clicking outside
  const preventClose = () => {
    // Do nothing - prevents closing
    return false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={preventClose}>
      <DialogContent 
        className="sm:max-w-md" 
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        hideCloseButton={true}
      >
        <DialogHeader>
          <DialogTitle>Your Information</DialogTitle>
          <DialogDescription className="text-red-500 font-medium">
            This information is required to proceed. You cannot close this modal.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <LabelMedium htmlFor="name">Name</LabelMedium>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                autoFocus
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <LabelMedium htmlFor="email">Email</LabelMedium>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}