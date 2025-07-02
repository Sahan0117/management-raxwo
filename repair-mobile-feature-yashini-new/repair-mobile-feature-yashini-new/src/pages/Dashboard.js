import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Highcharts from "highcharts";
import "highcharts/highcharts-3d";
import HighchartsReact from "highcharts-react-official";
import incomeIcon from "../icon/add-to-basket1 (2).png";
import costIcon from "../icon/8.png";
import profitIcon from "../icon/2.png";
import { FaSyncAlt } from "react-icons/fa"; // Added to fix the undefined error
import "../styles/Dashboard.css";

const API_URL = "http://localhost:5002/api/dashboard";

const Dashboard = ({ darkMode }) => {
  const navigate = useNavigate();
  const [dailyData, setDailyData] = useState({ income: 0, cost: 0, profit: 0 });
  const [sixMonthData, setSixMonthData] = useState({ months: [], income: [], cost: [], profit: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isDarkMode = darkMode;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setDailyData({ income: data.dailyIncome, cost: data.dailyCost, profit: data.dailyProfit });
      setSixMonthData({
        months: data.sixMonthMonths,
        income: data.sixMonthIncome,
        cost: data.sixMonthCost,
        profit: data.sixMonthProfit,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cashierId');
    localStorage.removeItem('cashierName');
    navigate('/');
  };

  const chartOptions = {
    chart: {
      type: "column",
      options3d: {
        enabled: true,
        alpha: 1,
        beta: 0,
        depth: 30,
        viewDistance: 25,
        frame: {
          bottom: { size: 1, color: isDarkMode ? "#2d3748" : "#ffffff" },
          side: { size: 0 },
          back: { size: 0 },
        },
      },
      backgroundColor: isDarkMode ? "#2d3748" : "#ffffff",
      borderWidth: 0,
    },
    title: {
      text: "6-Month Overview",
      style: { color: isDarkMode ? "#e2e8f0" : "#2d3748", fontFamily: "'Poppins', sans-serif" },
    },
    xAxis: {
      categories: sixMonthData.months,
      labels: {
        style: {
          color: isDarkMode ? "#e2e8f0" : "#2d3748",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "14px",
        },
      },
      lineColor: isDarkMode ? "#e2e8f0" : "#2d3748",
    },
    yAxis: {
      title: { text: null },
      labels: {
        style: {
          color: isDarkMode ? "#e2e8f0" : "#2d3748",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "14px",
        },
        formatter: function () {
          return Highcharts.numberFormat(this.value, 0);
        },
      },
      gridLineColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
      max: Math.max(...sixMonthData.income, ...sixMonthData.cost, ...sixMonthData.profit) * 1.2 || 60000,
      lineColor: isDarkMode ? "#e2e8f0" : "#2d3748",
      lineWidth: 1,
      offset: 0,
    },
    plotOptions: {
      column: {
        depth: 20,
        groupPadding: 0.3,
        pointPadding: 0.05,
        colorByPoint: false,
        dataLabels: {
          enabled: true,
          format: "{y}",
          style: {
            color: isDarkMode ? "#e2e8f0" : "#2d3748",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "12px",
            textOutline: "none",
          },
        },
      },
    },
    series: [
      {
        name: "Income",
        data: sixMonthData.income,
        color: "#1e90ff",
      },
      {
        name: "Cost",
        data: sixMonthData.cost,
        color: "#32cd32",
      },
      {
        name: "Profit",
        data: sixMonthData.profit,
        color: "#ff4040",
      },
    ],
    legend: {
      align: "center",
      verticalAlign: "bottom",
      itemStyle: {
        color: isDarkMode ? "#e2e8f0" : "#2d3748",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "14px",
      },
    },
    credits: { enabled: false },
    tooltip: {
      backgroundColor: isDarkMode ? "rgba(45, 55, 72, 0.9)" : "rgba(255, 255, 255, 0.9)",
      style: {
        color: isDarkMode ? "#e2e8f0" : "#2d3748",
        fontFamily: "'Poppins', sans-serif",
      },
    },
  };

  return (
    <div className={`pos-container ${darkMode ? "dark" : ""}`}>
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome !</h1>
          <div className="header-actions">
            
          </div>
        </header>

        {loading ? (
          <div className="loading">
            <FaSyncAlt className="spin" /> Loading...
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className="summary-grid">
              <div className="summary-card">
                <img src={incomeIcon} alt="Income Icon" className="card-icon income-icon" />
                <div className="card-content">
                  <h3>Daily Income</h3>
                  <p>Rs. {dailyData.income.toFixed(2)}</p>
                </div>
              </div>
              <div className="summary-card">
                <img src={costIcon} alt="Cost Icon" className="card-icon cost-icon" />
                <div className="card-content">
                  <h3>Daily Cost</h3>
                  <p>Rs. {dailyData.cost.toFixed(2)}</p>
                </div>
              </div>
              <div className="summary-card">
                <img src={profitIcon} alt="Profit Icon" className="card-icon profit-icon" />
                <div className="card-content">
                  <h3>Daily Profit</h3>
                  <p>Rs. {dailyData.profit.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;