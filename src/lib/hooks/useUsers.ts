import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    image?: string;
    createdAt: string;
}

interface CreateUserData {
    name: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
    image?: string;
}

interface UpdateUserData {
    name?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
    image?: string;
}

// Fetch all users
const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch("/api/users");
    if (!response.ok) {
        throw new Error("Erreur lors du chargement des utilisateurs");
    }
    return response.json();
};

// Create user
const createUser = async (data: CreateUserData): Promise<User> => {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création de l'utilisateur");
    }
    return response.json();
};

// Update user
const updateUser = async ({ id, data }: { id: string; data: UpdateUserData }): Promise<User> => {
    const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
    }
    return response.json();
};

// Delete user
const deleteUser = async (id: string): Promise<void> => {
    const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
    }
};

export function useUsers() {
    const queryClient = useQueryClient();

    const { data: users, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const updateUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    return {
        users,
        isLoading,
        error,
        createUser: createUserMutation,
        updateUser: updateUserMutation,
        deleteUser: deleteUserMutation,
    };
}
