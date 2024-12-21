'use client'

import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, X } from 'lucide-react';

interface Task {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    progress: number;
    dependencies?: number[];
}

interface GanttProps {
    initialTasks?: Task[];
}

const GanttChart: React.FC<GanttProps> = ({ initialTasks = defaultTasks }) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [hoveredTask, setHoveredTask] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [formData, setFormData] = useState<Partial<Task>>({
        name: '',
        startDate: new Date(),
        endDate: new Date(),
        progress: 0
    });

    // Get date range for the chart
    const dateRange = tasks.reduce((range, task) => {
        if (!range.startDate || task.startDate < range.startDate) {
            range.startDate = task.startDate;
        }
        if (!range.endDate || task.endDate > range.endDate) {
            range.endDate = task.endDate;
        }
        return range;
    }, { startDate: null as Date | null, endDate: null as Date | null });

    // Generate array of weeks between start and end dates
    const getWeeksInRange = (start: Date, end: Date): { startOfWeek: Date; endOfWeek: Date }[] => {
        const weeks = [];
        const current = new Date(start);
        current.setDate(current.getDate() - current.getDay());
        while (current <= end) {
            const startOfWeek = new Date(current);
            const endOfWeek = new Date(current);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            weeks.push({ startOfWeek, endOfWeek });
            current.setDate(current.getDate() + 7);
        }
        return weeks;
    };

    const weeks = dateRange.startDate && dateRange.endDate
        ? getWeeksInRange(dateRange.startDate, dateRange.endDate)
        : [];

    // Calculate task position and width
    const getTaskStyle = (task: Task) => {
        if (!dateRange.startDate || !dateRange.endDate) return {};

        const totalWeeks = weeks.length;
        const taskStart = task.startDate.getTime();
        const taskEnd = task.endDate.getTime();
        const rangeStart = dateRange.startDate.getTime();
        const rangeEnd = dateRange.endDate.getTime();

        const left = ((taskStart - rangeStart) / (rangeEnd - rangeStart)) * 100;
        const width = ((taskEnd - taskStart) / (rangeEnd - rangeStart)) * 100;

        return {
            left: `${left}%`,
            width: `${width}%`,
        };
    };

    const formatWeek = (startOfWeek: Date, endOfWeek: Date): string => {
        return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    };

    const handleAddTask = () => {
        setEditingTask(null);
        setFormData({
            name: '',
            startDate: new Date(),
            endDate: new Date(),
            progress: 0
        });
        setIsModalOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setFormData({
            name: task.name,
            startDate: task.startDate,
            endDate: task.endDate,
            progress: task.progress
        });
        setIsModalOpen(true);
    };

    const handleDeleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.startDate || !formData.endDate) return;

        if (editingTask) {
            setTasks(tasks.map(task =>
                task.id === editingTask.id
                    ? { ...task, ...formData } as Task
                    : task
            ));
        } else {
            const newTask: Task = {
                id: Math.max(0, ...tasks.map(t => t.id)) + 1,
                name: formData.name,
                startDate: new Date(formData.startDate),
                endDate: new Date(formData.endDate),
                progress: formData.progress || 0
            };
            setTasks([...tasks, newTask]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Project Timeline</h2>
                <button
                    onClick={handleAddTask}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    <PlusCircle className="w-4 h-4" />
                    Add Task
                </button>
            </div>

            {/* Gantt Content */}
            <div className="p-4">
                <div className="overflow-x-auto">
                    <div className="min-w-full">
                        {/* Header - Weeks */}
                        <div className="flex border-b border-gray-200">
                            <div className="w-48 flex-shrink-0 p-2 font-medium bg-gray-50">Task</div>
                            <div className="flex-grow flex">
                                {weeks.map((week, index) => (
                                    <div
                                        key={index}
                                        className="flex-1 p-2 text-center text-xs border-l border-gray-200"
                                    >
                                        {formatWeek(week.startOfWeek, week.endOfWeek)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tasks */}
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex border-b border-gray-200 hover:bg-gray-50 relative group"
                                onMouseEnter={() => setHoveredTask(task.id)}
                                onMouseLeave={() => setHoveredTask(null)}
                            >
                                <div className="w-48 flex-shrink-0 p-2 flex items-center justify-between">
                                    <span className="truncate">{task.name}</span>
                                    <div className="hidden group-hover:flex gap-2">
                                        <button
                                            onClick={() => handleEditTask(task)}
                                            className="text-gray-600 hover:text-blue-600"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task.id)}
                                            className="text-gray-600 hover:text-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-grow relative h-12">
                                    <div
                                        className="absolute top-2 h-8 rounded-lg bg-blue-500 hover:bg-blue-600
                                        transition-colors duration-150 cursor-pointer"
                                        style={getTaskStyle(task)}
                                    >
                                        <div
                                            className="h-full rounded-lg bg-blue-700"
                                            style={{ width: `${task.progress}%` }}
                                        />

                                        {hoveredTask === task.id && (
                                            <div className="absolute top-full mt-2 left-0 bg-white shadow-lg
                                                rounded-lg p-2 z-10 text-sm whitespace-nowrap">
                                                <div className="font-medium">{task.name}</div>
                                                <div>Start: {task.startDate.toLocaleDateString()}</div>
                                                <div>End: {task.endDate.toLocaleDateString()}</div>
                                                <div>Progress: {task.progress}%</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add/Edit Task Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {editingTask ? 'Edit Task' : 'Add New Task'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Task Name</label>
                                <input
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter task name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Date</label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">End Date</label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Progress (%)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                    max="100"
                                    value={formData.progress || 0}
                                    onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    {editingTask ? 'Update' : 'Add'} Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Default tasks
const defaultTasks: Task[] = [
    {
        id: 1,
        name: "Project Planning",
        startDate: new Date('2024-12-21'),
        endDate: new Date('2024-12-23'),
        progress: 60,
    },
    {
        id: 2,
        name: "Design Phase",
        startDate: new Date('2024-12-22'),
        endDate: new Date('2024-12-28'),
        progress: 40,
        dependencies: [1],
    },
    {
        id: 3,
        name: "Development",
        startDate: new Date('2024-12-24'),
        endDate: new Date('2024-12-28'),
        progress: 20,
        dependencies: [2],
    }
];

export default GanttChart;