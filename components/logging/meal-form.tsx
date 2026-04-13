"use client";

import { FormEvent, useState } from "react";
import { Camera, Clock3, MapPin, Soup } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { splitCommaSeparated, useApp } from "@/components/providers/app-provider";
import { MealLocation, MealType, PortionSize } from "@/lib/types";

export function MealForm() {
  const { addMeal } = useApp();
  const now = new Date();
  const [title, setTitle] = useState("");
  const [foods, setFoods] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [notes, setNotes] = useState("");
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [portionSize, setPortionSize] = useState<PortionSize>("regular");
  const [location, setLocation] = useState<MealLocation>("home");
  const [loggedAt, setLoggedAt] = useState(now.toISOString().slice(0, 16));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const parsedFoods = splitCommaSeparated(foods);
    const parsedIngredients = splitCommaSeparated(ingredients).map((name) => ({ name }));
    const result = await addMeal({
      title: title || parsedFoods.join(", ") || "Quick meal",
      loggedAt: new Date(loggedAt).toISOString(),
      mealType,
      foods: parsedFoods,
      ingredients: parsedIngredients,
      portionSize,
      location,
      notes
      ,
      photoUrl: photoUrl || undefined
    });
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setMessage("Meal logged.");
    setTitle("");
    setFoods("");
    setIngredients("");
    setNotes("");
    setPhotoUrl("");
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink/55">Meal log</p>
          <h2 className="text-lg font-semibold text-ink">Fast, flexible meal capture</h2>
        </div>
        <Chip label="3 levels" />
      </div>
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <Input
          placeholder="Quick title only: chicken salad from Sweetgreen"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Foods eaten" value={foods} onChange={(e) => setFoods(e.target.value)} />
          <Input placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="rounded-2xl bg-sand/60 p-3 text-xs text-ink/60">
            <Clock3 className="mb-2 h-4 w-4 text-ink" />
            Time
            <input
              className="mt-2 w-full border-0 bg-transparent text-sm text-ink outline-none"
              type="datetime-local"
              value={loggedAt}
              onChange={(e) => setLoggedAt(e.target.value)}
            />
          </label>
          <label className="rounded-2xl bg-sand/60 p-3 text-xs text-ink/60">
            <Soup className="mb-2 h-4 w-4 text-ink" />
            Portion
            <select
              className="mt-2 w-full border-0 bg-transparent text-sm text-ink outline-none"
              value={portionSize}
              onChange={(e) => setPortionSize(e.target.value as PortionSize)}
            >
              <option value="light">Light</option>
              <option value="regular">Regular</option>
              <option value="large">Large</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="rounded-2xl bg-sand/60 p-3 text-xs text-ink/60">
            Meal type
            <select
              className="mt-2 w-full border-0 bg-transparent text-sm text-ink outline-none"
              value={mealType}
              onChange={(e) => setMealType(e.target.value as MealType)}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </label>
          <label className="rounded-2xl bg-sand/60 p-3 text-xs text-ink/60">
            <MapPin className="mb-2 h-4 w-4 text-ink" />
            Location
            <select
              className="mt-2 w-full border-0 bg-transparent text-sm text-ink outline-none"
              value={location}
              onChange={(e) => setLocation(e.target.value as MealLocation)}
            >
              <option value="home">Home</option>
              <option value="restaurant">Restaurant</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <Input placeholder="Optional notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <label className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-line px-4 py-3 text-sm text-ink/55">
          <Camera className="h-4 w-4" />
          {photoUrl ? "Meal photo attached" : "Attach meal photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const objectUrl = URL.createObjectURL(file);
              setPhotoUrl(objectUrl);
            }}
          />
        </label>
        {photoUrl ? (
          <div className="overflow-hidden rounded-[24px] border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoUrl} alt="Meal preview" className="h-40 w-full object-cover" />
          </div>
        ) : null}
        {error ? <p className="text-sm text-[#9f4135]">{error}</p> : null}
        {message ? <p className="text-sm text-moss">{message}</p> : null}
        <Button className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save meal"}
        </Button>
      </form>
    </Card>
  );
}
