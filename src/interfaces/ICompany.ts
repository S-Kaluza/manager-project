interface ICompany{
    id: string;
    name: string;
    description: string;
}

interface ICreateCompanyResults{
    companyId: string;
}

interface IUpdateCompanyResults{
    name: string;
    description: string;
}

interface IDeleteCompanyResults{
    companyId: number;
}

interface ICompanyRequest{
    name?: string;
    description?: string;
}

