"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SortableItem({ id, children, className }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative",
        isDragging && "opacity-50 shadow-xl ring-2 ring-primary",
        className
      )}
      {...attributes}
    >
      {/* Drag Handle */}
      <button
        type="button"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-md bg-muted/80 hover:bg-muted cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
        {...listeners}
      >
        <GripVertical size={14} className="text-muted-foreground" />
      </button>
      {children}
    </div>
  );
}

interface SortableListProps<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  getId: (item: T) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  layout?: "vertical" | "grid";
}

export function SortableList<T>({
  items,
  onReorder,
  getId,
  renderItem,
  className,
  layout = "vertical",
}: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => getId(item) === active.id);
      const newIndex = items.findIndex((item) => getId(item) === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  };

  const strategy = layout === "grid" ? rectSortingStrategy : verticalListSortingStrategy;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(getId)} strategy={strategy}>
        <div className={className}>
          {items.map((item, index) => (
            <SortableItem key={getId(item)} id={getId(item)} className="group">
              {renderItem(item, index)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
