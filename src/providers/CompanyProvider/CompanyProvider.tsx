import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "../AuthProvider/AuthProvider";
import { createContext } from "react";
import { createCompany, deleteCompany, getCompanyById, updateCompany } from "./api";
import { useRouter } from "next/navigation";

interface ICompanyProviderValue {
    company: ICompany | null,
    isLoading: boolean,
    isError: boolean,
    fetchCompany: UseQueryResult<ICompany, Error>,
    create: UseMutationResult<ICreateCompanyResults, Error, ICompanyRequest, unknown>
    update: UseMutationResult<IUpdateCompanyResults, Error, ICompanyRequest, unknown>
    delete: UseMutationResult<IDeleteCompanyResults, Error, void, unknown>
}

const CompanyContext = createContext<ICompanyProviderValue>({} as ICompanyProviderValue);

const CompanyProvider = ({children}) => {
    const { user } = useAuth();
    const router = useRouter();
    const queryClient = useQueryClient();
    
    const {
        data: company,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['company'],
        queryFn: () => getCompanyById(),
        enabled: !!user?.companyId,
        staleTime: 1000 * 5 * 60,
        gcTime: 1000 * 60 * 30,
    });

    const createCompanyMutation = useMutation({
        mutationFn: createCompany,
        onSuccess: async (data: ICreateCompanyResults) => {
                    await queryClient.invalidateQueries({ queryKey: ['company'] });
                    router.back();
                },
    })

    const updateCompanyMutation = useMutation({
        mutationFn: updateCompany,
        onSuccess: async () => {
                    await queryClient.invalidateQueries({ queryKey: ['company'] });
                    router.back();
                },
    })

    const deleteCompanyMutation = useMutation({
        mutationFn: deleteCompany,
        onSuccess: async () => {
                    await queryClient.invalidateQueries({ queryKey: ['company'] });
                    router.refresh();
                },
    })

    const value: ICompanyProviderValue = {
        company: company || null,
        isLoading,
        isError,
        fetchCompany: { data: company, isLoading, isError } as UseQueryResult<ICompany, Error>,
        create: createCompanyMutation,
        update: updateCompanyMutation,
        delete: deleteCompanyMutation,
    };

    return (
        <CompanyContext.Provider value={value}>
            {children}
        </CompanyContext.Provider>
    );
};

export { CompanyProvider, CompanyContext };