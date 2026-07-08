"use client";

import React from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Loader2, Plus, Filter } from 'lucide-react';

// --- Header Component "Premium" ---
interface AdminHeaderProps {
    title: string;
    subtitle?: string;
    action?: {
        label: string;
        href?: string;
        onClick?: () => void;
        icon?: React.ElementType;
    };
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, action }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-1 text-gray-500 font-medium">
                        {subtitle}
                    </p>
                )}
            </div>

            {action && (
                <div className="flex-shrink-0">
                    {action.href ? (
                        <Link
                            href={action.href}
                            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                        >
                            {action.icon ? <action.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" /> : <Plus className="w-4 h-4 mr-2" />}
                            {action.label}
                        </Link>
                    ) : (
                        <button
                            onClick={action.onClick}
                            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                        >
                            {action.icon ? <action.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" /> : <Plus className="w-4 h-4 mr-2" />}
                            {action.label}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

// --- Search & Filter Component "Glassmorphic" ---
interface SearchFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
    children?: React.ReactNode;
}

export const AdminSearchFilter: React.FC<SearchFilterProps> = ({
    searchTerm,
    onSearchChange,
    placeholder = "Rechercher...",
    children
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-sm rounded-2xl p-1.5 mb-8 transition-all duration-300 hover:shadow-md focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-500/20">
            <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="relative flex-grow w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-3 bg-transparent border-none text-gray-900 placeholder-gray-400 focus:ring-0 sm:text-sm rounded-xl"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {children && (
                    <div className="flex items-center gap-2 w-full md:w-auto px-2 pb-2 md:pb-0 border-t md:border-t-0 border-gray-100 md:border-l pl-0 md:pl-2 pt-2 md:pt-0">
                        <div className="text-gray-400 hidden md:block">
                            <Filter className="w-4 h-4" />
                        </div>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Data Table Component "Modern Card" ---
interface DataTableProps {
    columns: { header: string; className?: string }[];
    children: React.ReactNode;
    isLoading?: boolean;
    isEmpty?: boolean;
    emptyMessage?: string;
}

export const AdminTable: React.FC<DataTableProps> = ({
    columns,
    children,
    isLoading,
    isEmpty,
    emptyMessage = "Aucune donnée trouvée"
}) => {
    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-20 text-center animate-pulse">
                <div className="flex flex-col items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
                    <p className="text-gray-500 font-medium">Chargement des données...</p>
                </div>
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-20 text-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Aucun résultat</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-50">
                    <thead>
                        <tr className="bg-gray-50/50">
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    scope="col"
                                    className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${col.className || ''}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Pagination Component "Minimalist" ---
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const AdminPagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-6 px-2">
            <p className="text-sm text-gray-500">
                Page <span className="font-semibold text-gray-900">{currentPage}</span> sur <span className="font-semibold text-gray-900">{totalPages}</span>
            </p>

            <nav className="inline-flex rounded-xl shadow-sm bg-white p-1 gap-1 border border-gray-100">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </nav>
        </div>
    );
};
