import { Injectable } from "@angular/core"
import { type Observable, of } from "rxjs"
import type { Report, Contract } from "../models/report.model"

@Injectable({
  providedIn: "root",
})
export class ReportService {
  private reports: Report[] = [
    {
      id: 1,
      title: "Website Redesign - Progress Report",
      description: "Monthly progress report for the Website Redesign project",
      date: "2025-03-15",
      type: "Progress Report",
      project: {
        id: 1,
        name: "Website Redesign",
        color: "from-purple-500 to-indigo-500",
      },
      author: "John Doe",
      size: "2.4 MB",
      format: "PDF",
    },
    {
      id: 2,
      title: "Mobile App Development - Budget Analysis",
      description: "Financial analysis and budget tracking for the Mobile App project",
      date: "2025-03-10",
      type: "Financial Report",
      project: {
        id: 2,
        name: "Mobile App Development",
        color: "from-emerald-500 to-teal-500",
      },
      author: "Jane Smith",
      size: "3.8 MB",
      format: "XLSX",
    },
    {
      id: 3,
      title: "Marketing Campaign - Performance Metrics",
      description: "Key performance indicators and metrics for the Marketing Campaign",
      date: "2025-03-05",
      type: "Analytics Report",
      project: {
        id: 3,
        name: "Marketing Campaign",
        color: "from-amber-500 to-orange-500",
      },
      author: "Emily Chen",
      size: "5.2 MB",
      format: "PDF",
    },
    {
      id: 4,
      title: "Data Migration - Technical Documentation",
      description: "Technical documentation and process overview for the Data Migration project",
      date: "2025-02-28",
      type: "Technical Report",
      project: {
        id: 4,
        name: "Data Migration",
        color: "from-sky-500 to-blue-500",
      },
      author: "Michael Wong",
      size: "4.7 MB",
      format: "PDF",
    },
    {
      id: 5,
      title: "Website Redesign - Client Approval Document",
      description: "Client approval documentation for the Website Redesign project",
      date: "2025-02-20",
      type: "Contract",
      project: {
        id: 1,
        name: "Website Redesign",
        color: "from-purple-500 to-indigo-500",
      },
      author: "Robert Johnson",
      size: "1.8 MB",
      format: "PDF",
    },
    {
      id: 6,
      title: "Marketing Campaign - Strategy Document",
      description: "Comprehensive strategy document for the Marketing Campaign",
      date: "2025-02-15",
      type: "Strategy Document",
      project: {
        id: 3,
        name: "Marketing Campaign",
        color: "from-amber-500 to-orange-500",
      },
      author: "Jessica Miller",
      size: "6.3 MB",
      format: "PPTX",
    },
  ]

  private contracts: Contract[] = [
    {
      id: 1,
      title: "Website Redesign - Client Agreement",
      description: "Official contract with Acme Corporation for the Website Redesign project",
      date: "2025-01-15",
      status: "Signed",
      project: {
        id: 1,
        name: "Website Redesign",
        color: "from-purple-500 to-indigo-500",
      },
      client: "Acme Corporation",
      value: "$25,000",
      endDate: "2025-05-30",
    },
    {
      id: 2,
      title: "Mobile App Development - Service Agreement",
      description: "Service agreement with TechStart Inc. for the Mobile App Development project",
      date: "2025-02-01",
      status: "Signed",
      project: {
        id: 2,
        name: "Mobile App Development",
        color: "from-emerald-500 to-teal-500",
      },
      client: "TechStart Inc.",
      value: "$45,000",
      endDate: "2025-08-15",
    },
    {
      id: 3,
      title: "Marketing Campaign - Statement of Work",
      description: "Statement of work for the Marketing Campaign project",
      date: "2025-01-20",
      status: "Signed",
      project: {
        id: 3,
        name: "Marketing Campaign",
        color: "from-amber-500 to-orange-500",
      },
      client: "Global Marketing Ltd.",
      value: "$18,500",
      endDate: "2025-06-30",
    },
    {
      id: 4,
      title: "Data Migration - Consulting Agreement",
      description: "Consulting agreement for the Data Migration project",
      date: "2025-01-10",
      status: "Signed",
      project: {
        id: 4,
        name: "Data Migration",
        color: "from-sky-500 to-blue-500",
      },
      client: "DataSystems Corp",
      value: "$32,000",
      endDate: "2025-05-15",
    },
  ]

  constructor() {}

  getReports(): Observable<Report[]> {
    return of(this.reports)
  }

  getContracts(): Observable<Contract[]> {
    return of(this.contracts)
  }
}
