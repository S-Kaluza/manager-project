export const getCompanyById = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const res = await fetch(`/api/company/get`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Not authenticated');
    const response = await res.json();
    return response;
};

export const createCompany = async (newCompany : ICompanyRequest) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const res = await fetch(`/api/company/create`, {
        method: 'POST',
        body: newCompany ? JSON.stringify(newCompany) : null,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Company creation failed');
    const response = await res.json();
    return response;
}

export const updateCompany = async (updatedCompany: ICompanyRequest) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const res = await fetch(`/api/company/update`, {
        method: 'PUT',
        body: updatedCompany ? JSON.stringify(updatedCompany) : null,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Company update failed');
    const response = await res.json();
    return response;
}

export const deleteCompany = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const res = await fetch(`/api/company/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Company deletion failed');
    const response = await res.json();
    return response;
}

