'use client';

import LiquidGlassCard from "@/components/glass/glassBox/liquidGlasscard";
import { DashboardAppsWrapper, DashboardTeamsWrapper } from "./StyledComponents";
import DynamicChart from "@/components/charts/DynamicChart/DynamicChart";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

function getData() {
  // W prawdziwej aplikacji tutaj byłby 'await fetch(...)'
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [4000, 3000, 2000, 2780, 1890, 2390, 677, 1234, 4321, 3456, 5678, 6789],
  };
}

function getTeamList() {
    return [
        { id: 1, name: 'Team Alpha', executedTasks: 150, weeklyAverage: 30, monthlyAverage: 120, yearlyAverage: 1500 },
        { id: 2, name: 'Team Beta', executedTasks: 200, weeklyAverage: 40, monthlyAverage: 160, yearlyAverage: 1800 },
        { id: 3, name: 'Team Gamma', executedTasks: 180, weeklyAverage: 35, monthlyAverage: 140, yearlyAverage: 1700 },
        { id: 4, name: 'Team Alpha', executedTasks: 150, weeklyAverage: 30, monthlyAverage: 120, yearlyAverage: 1500 },
        { id: 5, name: 'Team Beta', executedTasks: 200, weeklyAverage: 40, monthlyAverage: 160, yearlyAverage: 1800 },
        { id: 6, name: 'Team Gamma', executedTasks: 180, weeklyAverage: 35, monthlyAverage: 140, yearlyAverage: 1700 },
        { id: 7, name: 'Team Alpha', executedTasks: 150, weeklyAverage: 30, monthlyAverage: 120, yearlyAverage: 1500 },
        { id: 8, name: 'Team Beta', executedTasks: 200, weeklyAverage: 40, monthlyAverage: 160, yearlyAverage: 1800 },
        { id: 9, name: 'Team Gamma', executedTasks: 180, weeklyAverage: 35, monthlyAverage: 140, yearlyAverage: 1700 },
        { id: 10, name: 'Team Alpha', executedTasks: 150, weeklyAverage: 30, monthlyAverage: 120, yearlyAverage: 1500 },
        { id: 11, name: 'Team Beta', executedTasks: 200, weeklyAverage: 40, monthlyAverage: 160, yearlyAverage: 1800 },
        { id: 12, name: 'Team Gamma', executedTasks: 180, weeklyAverage: 35, monthlyAverage: 140, yearlyAverage: 1700 },
    ];
        
}

function DashboardPage() {
    const router = useRouter();
    const data = getData();
    const teams = getTeamList();

    const handleRowClick = (teamId: number) => {
        router.push(`/dashboard/teams/${teamId}`);
    };

    return (
        <>
            <DashboardTeamsWrapper>
                <LiquidGlassCard glow maxWidth={'55%'} marginBottom={'15vh'} marginTop={'5vh'}>
                    <DynamicChart 
                        title="Execution Tasks Over Time"
                        xAxisData={data.labels}
                        seriesData={data.values}
                    />
                </LiquidGlassCard>
                <LiquidGlassCard glow maxWidth={'40%'} marginTop={'5vh'} maxHeight={'60vh'} overflowY="auto">
                    Teams <Button variant="contained" size="small" style={{float: 'right', marginBottom: '10px'}}>Add Team</Button>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: '100%' }} aria-label="tabela zespołów">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nazwa Zespołu</TableCell>
                                    <TableCell align="right">Tasks</TableCell>
                                    <TableCell align="right">w-avg</TableCell>
                                    <TableCell align="right">m-avg</TableCell>
                                    <TableCell align="right">y-avg</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teams.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        hover // Dodaje efekt podświetlenia przy najechaniu (UX)
                                        onClick={() => handleRowClick(row.id)} // Obsługa kliknięcia
                                        sx={{ 
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            cursor: 'pointer' // Zmienia kursor na "rączkę" (UX)
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell align="right">{row.executedTasks}</TableCell>
                                        <TableCell align="right">{row.weeklyAverage}</TableCell>
                                        <TableCell align="right">{row.monthlyAverage}</TableCell>
                                        <TableCell align="right">{row.yearlyAverage}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                </LiquidGlassCard>
            </DashboardTeamsWrapper>
            <DashboardAppsWrapper>
                <LiquidGlassCard glow marginBottom={'5vh'} marginTop={'-10vh'} maxWidth={'30%'}>
                    Newest tasks
                </LiquidGlassCard>
                <LiquidGlassCard glow marginBottom={'5vh'} marginTop={'-10vh'} maxWidth={'30%'}>
                    Recent Activities
                </LiquidGlassCard>
                <LiquidGlassCard glow marginBottom={'5vh'} marginTop={'-10vh'} maxWidth={'30%'}>
                    Recent planning poker tour
                </LiquidGlassCard>
            </DashboardAppsWrapper>
        </>
    )
}

export default DashboardPage;