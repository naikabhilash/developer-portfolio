"""
CEO Financial Dashboard — Global PC & Printer Manufacturer
Streamlit application with Plotly visualizations and in-memory Pandas data layer.
"""

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta

# ---------------------------------------------------------------------------
# PAGE CONFIG
# ---------------------------------------------------------------------------
st.set_page_config(
    page_title="CEO Financial Command Center",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ---------------------------------------------------------------------------
# CUSTOM CSS — Dark charcoal + emerald/copper palette
# ---------------------------------------------------------------------------
st.markdown("""
<style>
    /* Global */
    .stApp { background-color: #0a0a0a; color: #d4d4d8; }
    section[data-testid="stSidebar"] { background-color: #111113; border-right: 1px solid #27272a; }
    .stSelectbox label, .stMultiSelect label { color: #a1a1aa !important; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; }

    /* KPI cards */
    .kpi-card {
        background: #18181b; border: 1px solid #27272a; border-radius: 10px;
        padding: 1.25rem 1.5rem; text-align: left;
    }
    .kpi-label { font-size: 0.7rem; color: #71717a; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 0.3rem; }
    .kpi-value { font-size: 1.75rem; font-weight: 700; color: #f4f4f5; line-height: 1.1; }
    .kpi-delta-up { font-size: 0.8rem; color: #10b981; }
    .kpi-delta-down { font-size: 0.8rem; color: #ef4444; }
    .kpi-sub { font-size: 0.65rem; color: #52525b; margin-top: 0.25rem; }

    /* Narrative box */
    .exec-narrative {
        background: #111113; border: 1px solid #27272a; border-radius: 10px;
        padding: 1.5rem; margin-bottom: 1rem;
    }
    .exec-narrative h4 { color: #10b981; margin: 0 0 0.75rem 0; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; }
    .exec-narrative li { color: #a1a1aa; font-size: 0.85rem; line-height: 1.7; }
    .insight-box {
        background: #0a0a0a; border: 1px solid #27272a; border-left: 3px solid #f59e0b;
        border-radius: 6px; padding: 1rem; margin-top: 1rem;
    }
    .insight-box p { color: #a1a1aa; font-size: 0.8rem; margin: 0; }

    /* Section headers */
    .section-header { font-size: 0.7rem; color: #52525b; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.5rem; border-bottom: 1px solid #1c1c1e; padding-bottom: 0.4rem; }

    /* Hide Streamlit branding */
    #MainMenu, footer, header { visibility: hidden; }
    .block-container { padding-top: 1rem; padding-bottom: 0; }
</style>
""", unsafe_allow_html=True)

# ---------------------------------------------------------------------------
# MOCK DATA ENGINE
# ---------------------------------------------------------------------------
np.random.seed(42)

REGIONS = ["AMER", "EMEA", "APJ"]
SEGMENTS_PS = ["Commercial", "Consumer"]
CATEGORIES_PS = ["Premium / AI PC", "Standard"]
FX_RATES = {"AMER": 1.0, "EMEA": 0.92, "APJ": 1.08}
FX_HEADWIND = {"AMER": 0.0, "EMEA": -0.035, "APJ": -0.042}


@st.cache_data
def generate_data():
    months = pd.date_range("2022-01-01", "2024-12-01", freq="MS")
    rows = []
    for dt in months:
        month_idx = (dt.year - 2022) * 12 + dt.month
        for region in REGIONS:
            # --- Personal Systems ---
            for seg in SEGMENTS_PS:
                for cat in CATEGORIES_PS:
                    base_units = 420_000 if seg == "Commercial" else 310_000
                    if cat == "Premium / AI PC":
                        base_units = int(base_units * 0.25)
                        asp = round(np.random.normal(1450, 80), 0)
                        gm_pct = round(np.random.normal(0.28, 0.015), 4)
                    else:
                        base_units = int(base_units * 0.75)
                        asp = round(np.random.normal(680, 40), 0)
                        gm_pct = round(np.random.normal(0.17, 0.01), 4)

                    # Seasonal + trend
                    seasonal = 1 + 0.12 * np.sin(2 * np.pi * (dt.month - 1) / 12)
                    trend = 1 + 0.003 * month_idx
                    if cat == "Premium / AI PC":
                        trend = 1 + 0.008 * month_idx  # AI PC uplift

                    units = int(base_units * seasonal * trend * np.random.uniform(0.92, 1.08))
                    region_scale = {"AMER": 1.0, "EMEA": 0.82, "APJ": 0.74}[region]
                    units = int(units * region_scale)
                    revenue_cc = units * asp  # constant currency
                    revenue_rpt = revenue_cc * (1 + FX_HEADWIND[region])
                    gp = revenue_cc * gm_pct

                    rows.append({
                        "date": dt, "region": region, "business": "Personal Systems",
                        "segment": seg, "category": cat,
                        "units": units, "asp": asp, "revenue_cc": revenue_cc,
                        "revenue_rpt": revenue_rpt, "gross_profit": gp, "gm_pct": gm_pct,
                    })

            # --- Printing ---
            hw_units = int(np.random.normal(85_000, 8_000) * {"AMER": 1.0, "EMEA": 0.78, "APJ": 0.65}[region])
            hw_asp = round(np.random.normal(320, 30), 0)
            hw_rev = hw_units * hw_asp
            supplies_rev = hw_rev * np.random.uniform(2.8, 3.5)  # supplies >> hardware
            mps_base = 42_000_000 * {"AMER": 1.0, "EMEA": 0.7, "APJ": 0.5}[region]
            churn = np.random.uniform(0.005, 0.012)
            mps_rev = mps_base * (1 - churn) ** month_idx * (1 + 0.002 * month_idx)

            for biz_cat, rev, u in [
                ("Hardware", hw_rev, hw_units),
                ("Supplies", supplies_rev, 0),
                ("MPS Recurring", mps_rev, 0),
            ]:
                gm = 0.18 if biz_cat == "Hardware" else 0.62 if biz_cat == "Supplies" else 0.55
                gm += np.random.normal(0, 0.01)
                rev_rpt = rev * (1 + FX_HEADWIND[region])
                rows.append({
                    "date": dt, "region": region, "business": "Printing",
                    "segment": biz_cat, "category": biz_cat,
                    "units": u, "asp": hw_asp if biz_cat == "Hardware" else 0,
                    "revenue_cc": rev, "revenue_rpt": rev_rpt,
                    "gross_profit": rev * gm, "gm_pct": round(gm, 4),
                })

    df = pd.DataFrame(rows)
    df["year"] = df["date"].dt.year
    df["quarter"] = df["date"].dt.to_period("Q").astype(str)
    return df


@st.cache_data
def working_capital_data():
    """DIO / DSO / DPO by quarter and region."""
    rows = []
    for y in [2022, 2023, 2024]:
        for q in range(1, 5):
            if y == 2024 and q > 4:
                break
            for region in REGIONS:
                dio = round(np.random.normal(48, 4), 1)
                dso = round(np.random.normal(42, 3), 1)
                dpo = round(np.random.normal(68, 5), 1)
                rows.append({
                    "quarter": f"{y}Q{q}", "region": region,
                    "dio": dio, "dso": dso, "dpo": dpo,
                    "ccc": round(dio + dso - dpo, 1),
                })
    return pd.DataFrame(rows)


@st.cache_data
def inventory_drag_data():
    cats = ["Standard Notebooks", "Inkjet Cartridges", "LaserJet Printers",
            "Desktop Towers", "AI PC Modules", "Large-Format Printers",
            "Monitor Panels", "Docking Stations"]
    rows = []
    for c in cats:
        rows.append({
            "category": c,
            "avg_inventory_$M": round(np.random.uniform(120, 480), 1),
            "dio_days": round(np.random.normal(52, 12), 1),
            "yoy_change_days": round(np.random.normal(2, 5), 1),
        })
    return pd.DataFrame(rows).sort_values("dio_days", ascending=False).head(5).reset_index(drop=True)


# ---------------------------------------------------------------------------
# LOAD DATA
# ---------------------------------------------------------------------------
df_all = generate_data()
df_wc = working_capital_data()
df_inv = inventory_drag_data()

# ---------------------------------------------------------------------------
# SIDEBAR FILTERS
# ---------------------------------------------------------------------------
with st.sidebar:
    st.markdown("#### 🎛️ Dashboard Filters")
    st.markdown("---")

    sel_regions = st.multiselect("Region", REGIONS, default=REGIONS)
    sel_years = st.multiselect("Fiscal Year", sorted(df_all["year"].unique()), default=sorted(df_all["year"].unique()))
    sel_biz = st.multiselect("Business Segment", ["Personal Systems", "Printing"], default=["Personal Systems", "Printing"])
    currency_mode = st.radio("Currency View", ["Reported", "Constant Currency"], index=0, horizontal=True)

    st.markdown("---")
    st.caption("💡 **Constant Currency** removes FX volatility, isolating organic operational performance.")

# ---------------------------------------------------------------------------
# APPLY FILTERS
# ---------------------------------------------------------------------------
df = df_all[
    (df_all["region"].isin(sel_regions)) &
    (df_all["year"].isin(sel_years)) &
    (df_all["business"].isin(sel_biz))
].copy()

rev_col = "revenue_rpt" if currency_mode == "Reported" else "revenue_cc"

# ---------------------------------------------------------------------------
# COMPUTED METRICS
# ---------------------------------------------------------------------------
total_rev = df[rev_col].sum()
total_gp = df["gross_profit"].sum()
gm_pct = (total_gp / total_rev * 100) if total_rev else 0

# YoY growth
max_year = df["year"].max() if not df.empty else 2024
prev_rev = df[df["year"] == max_year - 1][rev_col].sum()
curr_rev = df[df["year"] == max_year][rev_col].sum()
yoy_growth = ((curr_rev - prev_rev) / prev_rev * 100) if prev_rev else 0

# FCF approximation
fcf = total_gp * 0.42  # simplified proxy

# CCC
wc_filtered = df_wc[df_wc["region"].isin(sel_regions)]
avg_ccc = wc_filtered["ccc"].mean() if not wc_filtered.empty else 22

# FX impact
fx_delta_pct = ((df["revenue_rpt"].sum() - df["revenue_cc"].sum()) / df["revenue_cc"].sum() * 100) if df["revenue_cc"].sum() else 0

# AI PC mix
ps_df = df[df["business"] == "Personal Systems"]
ai_rev = ps_df[ps_df["category"] == "Premium / AI PC"][rev_col].sum()
ps_total_rev = ps_df[rev_col].sum()
ai_mix_pct = (ai_rev / ps_total_rev * 100) if ps_total_rev else 0

# Supplies recurring health
print_df = df[df["business"] == "Printing"]
supplies_rev = print_df[print_df["category"] == "Supplies"][rev_col].sum()
print_total = print_df[rev_col].sum()
supplies_pct = (supplies_rev / print_total * 100) if print_total else 0

# ---------------------------------------------------------------------------
# EXECUTIVE SUMMARY
# ---------------------------------------------------------------------------
st.markdown("""
<div class="exec-narrative">
    <h4>▎ Executive Insights — The "So What?"</h4>
    <ul>
        <li><strong>AI PC Premium Mix Traction:</strong> Premium / AI PC category now represents <strong>{ai_mix:.1f}%</strong> of Personal Systems revenue, commanding ~2.1x the ASP of Standard SKUs and lifting blended segment margins.</li>
        <li><strong>Printing Supplies Recurring Health:</strong> Supplies revenue accounts for <strong>{supplies:.1f}%</strong> of total Printing segment — the high-margin annuity stream remains the primary profit engine despite secular hardware decline.</li>
        <li><strong>Cash Flow Impact:</strong> Free Cash Flow of <strong>${fcf:,.0f}M</strong> reflects disciplined working capital management with a Cash Conversion Cycle averaging <strong>{ccc:.0f} days</strong>.</li>
    </ul>
</div>
""".format(
    ai_mix=ai_mix_pct, supplies=supplies_pct, fcf=fcf / 1e6, ccc=avg_ccc
), unsafe_allow_html=True)

# Actionable insight flags
alerts = []
if avg_ccc > 25:
    alerts.append(f"⚠️ Cash Conversion Cycle at **{avg_ccc:.0f} days** — lengthening beyond 25-day target. Investigate DIO drag in Standard Notebooks and Inkjet inventory.")
if abs(fx_delta_pct) > 3:
    alerts.append(f"⚠️ FX headwinds eroding **{abs(fx_delta_pct):.1f}%** of constant-currency gains — exceeds the 3% materiality threshold. Review hedging positions in EMEA/APJ corridors.")

if alerts:
    insight_html = "".join(f"<p>{a}</p>" for a in alerts)
    st.markdown(f'<div class="insight-box">{insight_html}</div>', unsafe_allow_html=True)

# ---------------------------------------------------------------------------
# KPI ROW
# ---------------------------------------------------------------------------
st.markdown('<p class="section-header">Key Performance Indicators</p>', unsafe_allow_html=True)
k1, k2, k3, k4 = st.columns(4)

def kpi_card(label, value, delta=None, delta_label="", sub=""):
    delta_cls = "kpi-delta-up" if delta and delta >= 0 else "kpi-delta-down"
    delta_arrow = "▲" if delta and delta >= 0 else "▼"
    delta_html = f'<div class="{delta_cls}">{delta_arrow} {abs(delta):.1f}% {delta_label}</div>' if delta is not None else ""
    sub_html = f'<div class="kpi-sub">{sub}</div>' if sub else ""
    return f"""
    <div class="kpi-card">
        <div class="kpi-label">{label}</div>
        <div class="kpi-value">{value}</div>
        {delta_html}
        {sub_html}
    </div>"""

with k1:
    st.markdown(kpi_card(
        f"Revenue ({currency_mode})", f"${total_rev / 1e9:,.1f}B",
        delta=yoy_growth, delta_label="YoY", sub="Toggle currency view in sidebar"
    ), unsafe_allow_html=True)

with k2:
    target_gm = 24.0
    gm_delta = gm_pct - target_gm
    st.markdown(kpi_card(
        "Gross Profit Margin", f"{gm_pct:.1f}%",
        delta=gm_delta, delta_label="vs Target", sub=f"Target: {target_gm:.0f}%"
    ), unsafe_allow_html=True)

with k3:
    st.markdown(kpi_card(
        "Free Cash Flow", f"${fcf / 1e9:,.2f}B",
        sub="~42% of Gross Profit proxy"
    ), unsafe_allow_html=True)

with k4:
    ccc_delta = avg_ccc - 22
    st.markdown(kpi_card(
        "Cash Conversion Cycle", f"{avg_ccc:.0f} days",
        delta=-ccc_delta, delta_label="vs Benchmark",
        sub="DIO + DSO − DPO"
    ), unsafe_allow_html=True)

st.markdown("")

# ---------------------------------------------------------------------------
# VISUAL ROW 1: Revenue Trend + Scatter
# ---------------------------------------------------------------------------
st.markdown('<p class="section-header">Strategic Discovery — Revenue & Portfolio Analytics</p>', unsafe_allow_html=True)
v1, v2 = st.columns(2)

PLOTLY_LAYOUT = dict(
    paper_bgcolor="#0a0a0a", plot_bgcolor="#111113",
    font=dict(color="#a1a1aa", size=10),
    margin=dict(l=40, r=20, t=35, b=40),
    legend=dict(bgcolor="rgba(0,0,0,0)", font=dict(size=9)),
    height=320,
)

_AXIS_GRID = dict(gridcolor="#1c1c1e", zerolinecolor="#27272a")

with v1:
    monthly = df.groupby("date").agg(
        revenue=pd.NamedAgg(column=rev_col, aggfunc="sum"),
        gross_profit=pd.NamedAgg(column="gross_profit", aggfunc="sum"),
    ).reset_index()
    monthly["op_margin"] = (monthly["gross_profit"] / monthly["revenue"] * 100).round(1)
    monthly["revenue_B"] = monthly["revenue"] / 1e9

    fig1 = go.Figure()
    fig1.add_trace(go.Scatter(
        x=monthly["date"], y=monthly["revenue_B"], name="Revenue ($B)",
        line=dict(color="#10b981", width=2), fill="tozeroy",
        fillcolor="rgba(16,185,129,0.08)",
    ))
    fig1.add_trace(go.Scatter(
        x=monthly["date"], y=monthly["op_margin"], name="Gross Margin %",
        yaxis="y2", line=dict(color="#f59e0b", width=2, dash="dot"),
    ))
    fig1.update_layout(
        **PLOTLY_LAYOUT,
        title=dict(text="Revenue & Gross Margin Trend", font=dict(size=12, color="#d4d4d8")),
        xaxis=dict(**_AXIS_GRID),
        yaxis=dict(title="Revenue ($B)", **_AXIS_GRID),
        yaxis2=dict(title="Margin %", overlaying="y", side="right", gridcolor="#1c1c1e",
                    showgrid=False, range=[0, 50]),
    )
    st.plotly_chart(fig1, use_container_width=True)

with v2:
    ps_scatter = ps_df.groupby(["category", "region"]).agg(
        units=pd.NamedAgg(column="units", aggfunc="sum"),
        asp=pd.NamedAgg(column="asp", aggfunc="mean"),
        gp=pd.NamedAgg(column="gross_profit", aggfunc="sum"),
    ).reset_index()

    fig2 = px.scatter(
        ps_scatter, x="units", y="asp", size="gp", color="category",
        facet_col=None, hover_data=["region"],
        color_discrete_map={"Premium / AI PC": "#10b981", "Standard": "#71717a"},
        size_max=45,
    )
    fig2.update_layout(
        **PLOTLY_LAYOUT,
        title=dict(text="Personal Systems: Volume vs. Value", font=dict(size=12, color="#d4d4d8")),
        xaxis=dict(title="Units Shipped", **_AXIS_GRID),
        yaxis=dict(title="Avg Selling Price ($)", **_AXIS_GRID),
    )
    st.plotly_chart(fig2, use_container_width=True)

# ---------------------------------------------------------------------------
# VISUAL ROW 2: Printing Mix + FX Bridge
# ---------------------------------------------------------------------------
st.markdown('<p class="section-header">Segment Deep Dive — Printing Mix & FX Impact</p>', unsafe_allow_html=True)
v3, v4 = st.columns(2)

with v3:
    print_mix = print_df.groupby(["quarter", "category"]).agg(
        revenue=pd.NamedAgg(column=rev_col, aggfunc="sum")
    ).reset_index()

    fig3 = px.bar(
        print_mix, x="quarter", y="revenue", color="category",
        color_discrete_map={"Hardware": "#52525b", "Supplies": "#c2956a", "MPS Recurring": "#10b981"},
        barmode="stack",
    )
    fig3.update_layout(
        **PLOTLY_LAYOUT,
        title=dict(text="Printing Segment Revenue Mix", font=dict(size=12, color="#d4d4d8")),
        xaxis=dict(title="", **_AXIS_GRID),
        yaxis=dict(title="Revenue ($)", **_AXIS_GRID),
    )
    fig3.update_yaxes(tickformat=",.0s")
    st.plotly_chart(fig3, use_container_width=True)

with v4:
    # Waterfall: CC → FX Impact → Reported
    cc_total = df["revenue_cc"].sum()
    rpt_total = df["revenue_rpt"].sum()
    fx_impact = rpt_total - cc_total

    fig4 = go.Figure(go.Waterfall(
        x=["Constant Currency", "FX Impact", "Reported Revenue"],
        y=[cc_total, fx_impact, rpt_total],
        measure=["absolute", "relative", "total"],
        text=[f"${cc_total/1e9:.2f}B", f"${fx_impact/1e9:.2f}B", f"${rpt_total/1e9:.2f}B"],
        textposition="outside",
        connector=dict(line=dict(color="#27272a")),
        increasing=dict(marker=dict(color="#10b981")),
        decreasing=dict(marker=dict(color="#ef4444")),
        totals=dict(marker=dict(color="#3b82f6")),
    ))
    fig4.update_layout(
        **PLOTLY_LAYOUT,
        title=dict(text="FX Impact Bridge: CC → Reported", font=dict(size=12, color="#d4d4d8")),
        xaxis=dict(**_AXIS_GRID),
        yaxis=dict(**_AXIS_GRID),
        showlegend=False,
    )
    fig4.update_yaxes(tickformat=",.0s")
    st.plotly_chart(fig4, use_container_width=True)

# ---------------------------------------------------------------------------
# VISUAL ROW 3: Geo Heatmap + Inventory Table
# ---------------------------------------------------------------------------
st.markdown('<p class="section-header">Tactical Audit — Geographic & Working Capital</p>', unsafe_allow_html=True)
v5, v6 = st.columns(2)

with v5:
    geo_perf = df.groupby(["region", "category"]).agg(
        gm=pd.NamedAgg(column="gm_pct", aggfunc="mean")
    ).reset_index()
    geo_perf["gm_display"] = (geo_perf["gm"] * 100).round(1)

    pivot = geo_perf.pivot_table(index="region", columns="category", values="gm_display", aggfunc="mean").fillna(0)

    fig5 = go.Figure(data=go.Heatmap(
        z=pivot.values,
        x=pivot.columns.tolist(),
        y=pivot.index.tolist(),
        colorscale=[[0, "#18181b"], [0.3, "#1c4a3a"], [0.6, "#10b981"], [1, "#34d399"]],
        text=[[f"{v:.1f}%" for v in row] for row in pivot.values],
        texttemplate="%{text}",
        textfont=dict(size=10),
        hovertemplate="Region: %{y}<br>Category: %{x}<br>Margin: %{text}<extra></extra>",
        colorbar=dict(title=dict(text="GM%", font=dict(size=10)), tickfont=dict(size=9)),
    ))
    fig5.update_layout(
        **{**PLOTLY_LAYOUT, "height": 340},
        title=dict(text="Geographic Profitability Matrix (GM%)", font=dict(size=12, color="#d4d4d8")),
        xaxis=dict(tickangle=-30, tickfont=dict(size=8), **_AXIS_GRID),
        yaxis=dict(**_AXIS_GRID),
    )
    st.plotly_chart(fig5, use_container_width=True)

with v6:
    st.markdown("##### Top 5 DIO Drag — Inventory Categories")
    st.markdown('<p style="font-size:0.7rem;color:#52525b;">Categories contributing most to Days Inventory Outstanding elevation.</p>', unsafe_allow_html=True)

    styled_inv = df_inv.style.format({
        "avg_inventory_$M": "${:,.0f}M",
        "dio_days": "{:.0f}",
        "yoy_change_days": "{:+.1f}",
    }).background_gradient(
        subset=["dio_days"], cmap="YlOrRd", vmin=30, vmax=75,
    ).set_properties(**{
        "color": "#d4d4d8", "background-color": "#111113",
        "border": "1px solid #27272a", "font-size": "0.8rem",
    }).set_table_styles([
        {"selector": "th", "props": [
            ("background-color", "#18181b"), ("color", "#71717a"),
            ("font-size", "0.7rem"), ("text-transform", "uppercase"),
            ("letter-spacing", "0.08em"), ("border", "1px solid #27272a"),
        ]},
    ])
    st.dataframe(df_inv, use_container_width=True, hide_index=True)
