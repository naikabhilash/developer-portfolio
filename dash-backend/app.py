"""
Supply Chain Telemetry & Logistics Routing — Dash Plotly Backend
Serves interactive Plotly charts embedded into the Next.js portfolio via iframe.
Run: python app.py
"""

import dash
from dash import dcc, html
import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import numpy as np

# ============================================================================
# DATA
# ============================================================================

# Inventory velocity across fulfillment centers
velocity_df = pd.DataFrame({
    "Hub": ["EU-West", "US-East", "APAC", "LATAM", "MENA", "EU-North"],
    "Velocity": [85, 92, 78, 65, 71, 88],
    "Capacity": [94, 97, 82, 70, 76, 91],
})

# Satellite telemetry time-series
np.random.seed(42)
time_index = pd.date_range("2024-01-01", periods=48, freq="h")
telemetry_df = pd.DataFrame({
    "Timestamp": time_index,
    "Latitude": np.cumsum(np.random.randn(48) * 0.3) + 52.0,
    "Longitude": np.cumsum(np.random.randn(48) * 0.3) + 4.5,
    "Signal_Strength": np.random.uniform(75, 100, 48),
})

# Hub throughput over time
throughput_df = pd.DataFrame({
    "Hour": list(range(24)),
    "Hamburg": np.random.randint(60, 100, 24),
    "Rotterdam": np.random.randint(65, 100, 24),
    "Singapore": np.random.randint(55, 95, 24),
})

# Network health metrics
health_df = pd.DataFrame({
    "Metric": ["Latency (ms)", "Uptime (%)", "Packet Loss (%)", "Throughput (Gbps)"],
    "Value": [12, 99.9, 0.02, 8.4],
    "Target": [15, 99.5, 0.05, 8.0],
})

# ============================================================================
# PLOTLY FIGURES
# ============================================================================

# Figure 1: Global Route Map (Scattergeo)
fig_map = go.Figure()
fig_map.add_trace(go.Scattergeo(
    lon=telemetry_df["Longitude"],
    lat=telemetry_df["Latitude"],
    mode="lines+markers",
    line=dict(width=2, color="#10b981"),
    marker=dict(size=4, color="#10b981", opacity=0.8),
    name="Route Path",
))
fig_map.update_geos(
    bgcolor="rgba(0,0,0,0)",
    landcolor="#18181b",
    oceancolor="#09090b",
    lakecolor="#09090b",
    coastlinecolor="#27272a",
    countrycolor="#27272a",
    showframe=False,
    projection_type="natural earth",
)
fig_map.update_layout(
    paper_bgcolor="#09090b",
    plot_bgcolor="#09090b",
    font_color="#a1a1aa",
    margin=dict(l=0, r=0, t=30, b=0),
    title=dict(text="Global Routing Vectors", font=dict(size=12, color="#71717a")),
    showlegend=False,
    height=220,
)

# Figure 2: Inventory Velocity Line Chart
fig_velocity = go.Figure()
fig_velocity.add_trace(go.Scatter(
    x=velocity_df["Hub"],
    y=velocity_df["Velocity"],
    mode="lines+markers",
    line=dict(color="#10b981", width=2),
    marker=dict(size=8, color="#10b981"),
    name="Velocity",
))
fig_velocity.add_trace(go.Scatter(
    x=velocity_df["Hub"],
    y=velocity_df["Capacity"],
    mode="lines+markers",
    line=dict(color="#3f3f46", width=2, dash="dash"),
    marker=dict(size=6, color="#3f3f46"),
    name="Capacity",
))
fig_velocity.update_layout(
    paper_bgcolor="#09090b",
    plot_bgcolor="#09090b",
    font_color="#a1a1aa",
    margin=dict(l=40, r=20, t=30, b=30),
    title=dict(text="Inventory Processing Velocity", font=dict(size=12, color="#71717a")),
    xaxis=dict(gridcolor="#27272a", zerolinecolor="#27272a"),
    yaxis=dict(gridcolor="#27272a", zerolinecolor="#27272a"),
    legend=dict(font=dict(size=10)),
    height=220,
)

# Figure 3: Hub Throughput Heatmap
fig_throughput = go.Figure(data=go.Heatmap(
    z=[throughput_df["Hamburg"], throughput_df["Rotterdam"], throughput_df["Singapore"]],
    x=throughput_df["Hour"],
    y=["Hamburg", "Rotterdam", "Singapore"],
    colorscale=[[0, "#09090b"], [0.5, "#064e3b"], [1, "#10b981"]],
    showscale=False,
))
fig_throughput.update_layout(
    paper_bgcolor="#09090b",
    plot_bgcolor="#09090b",
    font_color="#a1a1aa",
    margin=dict(l=80, r=20, t=30, b=30),
    title=dict(text="Transit Hub Capacity (24h)", font=dict(size=12, color="#71717a")),
    xaxis=dict(title="Hour", gridcolor="#27272a"),
    yaxis=dict(gridcolor="#27272a"),
    height=200,
)

# Figure 4: Network Health Gauge
fig_health = go.Figure()
fig_health.add_trace(go.Indicator(
    mode="gauge+number",
    value=99.9,
    title={"text": "Uptime %", "font": {"size": 12, "color": "#71717a"}},
    gauge={
        "axis": {"range": [95, 100], "tickcolor": "#27272a"},
        "bar": {"color": "#10b981"},
        "bgcolor": "#18181b",
        "bordercolor": "#27272a",
        "steps": [
            {"range": [95, 99], "color": "#1c1c1c"},
            {"range": [99, 100], "color": "#064e3b"},
        ],
        "threshold": {
            "line": {"color": "#10b981", "width": 2},
            "thickness": 0.8,
            "value": 99.5,
        },
    },
    number={"font": {"color": "#10b981"}},
))
fig_health.update_layout(
    paper_bgcolor="#09090b",
    plot_bgcolor="#09090b",
    font_color="#a1a1aa",
    margin=dict(l=20, r=20, t=40, b=20),
    height=200,
)

# Figure 5: Signal Strength over time
fig_signal = go.Figure()
fig_signal.add_trace(go.Scatter(
    x=telemetry_df["Timestamp"],
    y=telemetry_df["Signal_Strength"],
    mode="lines",
    fill="tozeroy",
    line=dict(color="#10b981", width=1),
    fillcolor="rgba(16, 185, 129, 0.1)",
    name="Signal",
))
fig_signal.update_layout(
    paper_bgcolor="#09090b",
    plot_bgcolor="#09090b",
    font_color="#a1a1aa",
    margin=dict(l=40, r=20, t=30, b=30),
    title=dict(text="AIS Signal Strength (Live)", font=dict(size=12, color="#71717a")),
    xaxis=dict(gridcolor="#27272a", zerolinecolor="#27272a"),
    yaxis=dict(gridcolor="#27272a", zerolinecolor="#27272a", range=[60, 105]),
    showlegend=False,
    height=200,
)

# Figure 6: Latency distribution
latency_data = np.random.exponential(12, 200)
fig_latency = go.Figure()
fig_latency.add_trace(go.Histogram(
    x=latency_data,
    nbinsx=30,
    marker_color="#10b981",
    opacity=0.7,
))
fig_latency.update_layout(
    paper_bgcolor="#09090b",
    plot_bgcolor="#09090b",
    font_color="#a1a1aa",
    margin=dict(l=40, r=20, t=30, b=30),
    title=dict(text="Pipeline Latency Distribution (ms)", font=dict(size=12, color="#71717a")),
    xaxis=dict(gridcolor="#27272a", zerolinecolor="#27272a", title="ms"),
    yaxis=dict(gridcolor="#27272a", zerolinecolor="#27272a", title="Count"),
    showlegend=False,
    height=200,
)

# ============================================================================
# DASH APP
# ============================================================================

app = dash.Dash(
    __name__,
    title="Supply Chain Telemetry",
    suppress_callback_exceptions=True,
)

app.layout = html.Div(
    style={
        "backgroundColor": "#09090b",
        "minHeight": "100vh",
        "padding": "16px",
        "fontFamily": "system-ui, -apple-system, sans-serif",
    },
    children=[
        # Top row: Map + Signal
        html.Div(
            style={"display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "12px", "marginBottom": "12px"},
            children=[
                html.Div(
                    style={"border": "1px solid #27272a", "borderRadius": "8px", "padding": "8px", "backgroundColor": "#0a0a0a"},
                    children=[dcc.Graph(figure=fig_map, config={"displayModeBar": False})],
                ),
                html.Div(
                    style={"border": "1px solid #27272a", "borderRadius": "8px", "padding": "8px", "backgroundColor": "#0a0a0a"},
                    children=[dcc.Graph(figure=fig_signal, config={"displayModeBar": False})],
                ),
            ],
        ),
        # Middle row: Velocity + Throughput Heatmap
        html.Div(
            style={"display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "12px", "marginBottom": "12px"},
            children=[
                html.Div(
                    style={"border": "1px solid #27272a", "borderRadius": "8px", "padding": "8px", "backgroundColor": "#0a0a0a"},
                    children=[dcc.Graph(figure=fig_velocity, config={"displayModeBar": False})],
                ),
                html.Div(
                    style={"border": "1px solid #27272a", "borderRadius": "8px", "padding": "8px", "backgroundColor": "#0a0a0a"},
                    children=[dcc.Graph(figure=fig_throughput, config={"displayModeBar": False})],
                ),
            ],
        ),
        # Bottom row: Health Gauge + Latency
        html.Div(
            style={"display": "grid", "gridTemplateColumns": "1fr 1fr", "gap": "12px"},
            children=[
                html.Div(
                    style={"border": "1px solid #27272a", "borderRadius": "8px", "padding": "8px", "backgroundColor": "#0a0a0a"},
                    children=[dcc.Graph(figure=fig_health, config={"displayModeBar": False})],
                ),
                html.Div(
                    style={"border": "1px solid #27272a", "borderRadius": "8px", "padding": "8px", "backgroundColor": "#0a0a0a"},
                    children=[dcc.Graph(figure=fig_latency, config={"displayModeBar": False})],
                ),
            ],
        ),
        # Footer status
        html.Div(
            style={"textAlign": "center", "marginTop": "16px", "padding": "12px", "border": "1px solid #27272a", "borderRadius": "8px", "backgroundColor": "#0a0a0a"},
            children=[
                html.Span("Core Metric: ", style={"color": "#10b981", "fontSize": "12px", "fontWeight": "600"}),
                html.Span("Low-Latency Geo-Spatial Routing & Live Asset Tracking", style={"color": "#71717a", "fontSize": "12px"}),
            ],
        ),
    ],
)

if __name__ == "__main__":
    app.run(debug=True, port=8050, host="0.0.0.0")
