import { FakeAppType } from "../types";

export interface ExtendedBlurState {
  isActive: boolean;
  isUnblurRegionActive: boolean;
  mousePosition: { x: number; y: number };
  clearRadius: number;
  blurIntensity: number;
  fakeAppType: FakeAppType;
}

export const renderMimicApp = (blurState: ExtendedBlurState) => {
  switch (blurState.fakeAppType) {
    case "code":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#1e1e1e",
            color: "#d4d4d4",
            fontFamily: "Consolas, monospace",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              background: "#2d2d30",
              padding: "8px 16px",
              borderBottom: "1px solid #3e3e42",
              color: "#cccccc",
            }}
          >
            VS Code - main.tsx
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "200px",
                background: "#252526",
                borderRight: "1px solid #3e3e42",
                padding: "16px",
              }}
            >
              <div style={{ marginBottom: "8px", fontSize: "11px", color: "#888" }}>EXPLORER</div>
              <div style={{ marginLeft: "8px" }}>
                <div style={{ margin: "4px 0" }}>📁 src</div>
                <div style={{ margin: "4px 0", marginLeft: "16px" }}>📁 components</div>
                <div style={{ margin: "4px 0", marginLeft: "32px", color: "#569cd6" }}>App.tsx</div>
                <div style={{ margin: "4px 0", marginLeft: "32px", color: "#ce9178" }}>main.tsx</div>
              </div>
            </div>
            <div style={{ flex: 1, padding: "16px" }}>
              <div>
                <span style={{ color: "#569cd6" }}>import</span> <span style={{ color: "#ce9178" }}>React</span>{" "}
                <span style={{ color: "#569cd6" }}>from</span>
                <span style={{ color: "#ce9178" }}>'react'</span>;
              </div>
              <div>
                <span style={{ color: "#569cd6" }}>import</span> <span style={{ color: "#ce9178" }}>ReactDOM</span>{" "}
                <span style={{ color: "#569cd6" }}>from</span>
                <span style={{ color: "#ce9178" }}>'react-dom/client'</span>;
              </div>
              <div>
                <span style={{ color: "#569cd6" }}>import</span> <span style={{ color: "#ce9178" }}>App</span>{" "}
                <span style={{ color: "#569cd6" }}>from</span> <span style={{ color: "#ce9178" }}>'./App'</span>;
              </div>
              <br />
              <div>
                <span style={{ color: "#569cd6" }}>const</span> <span style={{ color: "#9cdcfe" }}>root</span> ={" "}
                <span style={{ color: "#dcdcaa" }}>ReactDOM</span>.<span style={{ color: "#dcdcaa" }}>createRoot</span>(
              </div>
              <div style={{ marginLeft: "16px" }}>
                <span style={{ color: "#9cdcfe" }}>document</span>.
                <span style={{ color: "#dcdcaa" }}>getElementById</span>(
                <span style={{ color: "#ce9178" }}>'root'</span>) <span style={{ color: "#569cd6" }}>as</span>
                <span style={{ color: "#4ec9b0" }}>HTMLElement</span>
              </div>
              <div>);</div>
              <br />
              <div>
                <span style={{ color: "#9cdcfe" }}>root</span>.<span style={{ color: "#dcdcaa" }}>render</span>(
              </div>
              <div style={{ marginLeft: "16px" }}>
                &lt;<span style={{ color: "#4ec9b0" }}>React.StrictMode</span>&gt;
              </div>
              <div style={{ marginLeft: "32px" }}>
                &lt;<span style={{ color: "#4ec9b0" }}>App</span> /&gt;
              </div>
              <div style={{ marginLeft: "16px" }}>
                &lt;/<span style={{ color: "#4ec9b0" }}>React.StrictMode</span>&gt;
              </div>
              <div>);</div>
            </div>
          </div>
        </div>
      );

    case "terminal":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#0c0c0c",
            color: "#cccccc",
            fontFamily: "Consolas, monospace",
            fontSize: "14px",
            padding: "16px",
          }}
        >
          <div style={{ marginBottom: "8px" }}>Microsoft Windows [Version 10.0.22621.2715]</div>
          <div style={{ marginBottom: "8px" }}>(c) Microsoft Corporation. All rights reserved.</div>
          <br />
          <div style={{ marginBottom: "8px" }}>
            C:\Users\Developer&gt; <span style={{ color: "#00ff00" }}>npm run build</span>
          </div>
          <div style={{ marginBottom: "8px", color: "#ffff00" }}>Building application...</div>
          <div style={{ marginBottom: "8px" }}>✓ Compiled successfully in 4.2s</div>
          <div style={{ marginBottom: "8px" }}>✓ Build artifacts written to dist/</div>
          <br />
          <div style={{ marginBottom: "8px" }}>
            C:\Users\Developer&gt; <span style={{ color: "#00ff00" }}>git status</span>
          </div>
          <div style={{ marginBottom: "8px" }}>On branch main</div>
          <div style={{ marginBottom: "8px" }}>Your branch is up to date with 'origin/main'.</div>
          <br />
          <div style={{ marginBottom: "8px" }}>Changes not staged for commit:</div>
          <div style={{ marginBottom: "8px", color: "#ff0000" }}> modified: src/components/App.tsx</div>
          <div style={{ marginBottom: "8px", color: "#ff0000" }}> modified: package.json</div>
          <br />
          <div>
            C:\Users\Developer&gt; <span className="blink">_</span>
          </div>
        </div>
      );

    case "spreadsheet":
      return (
        <div style={{ width: "100%", height: "100%", background: "#ffffff" }}>
          <div style={{ background: "#217346", color: "white", padding: "8px 16px", fontWeight: "bold" }}>
            Microsoft Excel - Q4 Budget Analysis
          </div>
          <div
            style={{
              background: "#f8f9fa",
              padding: "8px",
              borderBottom: "1px solid #ddd",
              fontSize: "12px",
            }}
          >
            File | Home | Insert | Page Layout | Formulas | Data | Review | View
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "30px", background: "#f1f3f4", borderRight: "1px solid #ddd" }}>
              <div style={{ height: "20px", borderBottom: "1px solid #ddd" }}></div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div
                  key={i}
                  style={{
                    height: "25px",
                    borderBottom: "1px solid #ddd",
                    textAlign: "center",
                    fontSize: "11px",
                    paddingTop: "4px",
                  }}
                >
                  {i}
                </div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  height: "20px",
                  background: "#f1f3f4",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {["A", "B", "C", "D", "E", "F", "G"].map((col) => (
                  <div
                    key={col}
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      textAlign: "center",
                      fontSize: "11px",
                      paddingTop: "2px",
                    }}
                  >
                    {col}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", height: "25px", borderBottom: "1px solid #ddd" }}>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Category
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Q1
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Q2
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Q3
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Q4
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Total
                  </div>
                </div>
                <div style={{ display: "flex", height: "25px", borderBottom: "1px solid #ddd" }}>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                    }}
                  >
                    Revenue
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                    }}
                  >
                    $125,000
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                    }}
                  >
                    $134,500
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                    }}
                  >
                    $142,300
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                    }}
                  >
                    $158,900
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    $560,700
                  </div>
                </div>
                <div style={{ display: "flex", height: "25px", borderBottom: "1px solid #ddd" }}>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                    }}
                  >
                    Expenses
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                    }}
                  >
                    $89,200
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                    }}
                  >
                    $92,100
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                    }}
                  >
                    $95,800
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                    }}
                  >
                    $98,700
                  </div>
                  <div
                    style={{
                      width: "80px",
                      borderRight: "1px solid #ddd",
                      padding: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    $375,800
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "email":
      return (
        <div style={{ width: "100%", height: "100%", background: "#ffffff" }}>
          <div
            style={{
              background: "#0078d4",
              color: "white",
              padding: "8px 16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "16px" }}>📧</span>
            Microsoft Outlook
          </div>
          <div style={{ display: "flex", height: "calc(100% - 40px)" }}>
            <div
              style={{
                width: "250px",
                background: "#f3f2f1",
                borderRight: "1px solid #ddd",
                padding: "16px",
              }}
            >
              <div style={{ marginBottom: "16px", fontSize: "14px", fontWeight: "bold" }}>Folders</div>
              <div
                style={{
                  marginBottom: "8px",
                  padding: "4px",
                  background: "#e3f2fd",
                  borderRadius: "4px",
                  fontSize: "13px",
                }}
              >
                📥 Inbox (12)
              </div>
              <div style={{ marginBottom: "8px", padding: "4px", fontSize: "13px" }}>📤 Sent Items</div>
              <div style={{ marginBottom: "8px", padding: "4px", fontSize: "13px" }}>📋 Drafts (3)</div>
              <div style={{ marginBottom: "8px", padding: "4px", fontSize: "13px" }}>🗑️ Deleted Items</div>
            </div>
            <div style={{ width: "300px", borderRight: "1px solid #ddd", background: "#fafafa" }}>
              <div style={{ padding: "16px", borderBottom: "1px solid #ddd", background: "#fff" }}>
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>Inbox</div>
                <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>12 unread messages</div>
              </div>
              <div>
                <div
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #eee",
                    background: "#e3f2fd",
                  }}
                >
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>Project Update Meeting</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>Sarah Johnson - 10:30 AM</div>
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>Let's schedule our weekly sync...</div>
                </div>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>Q4 Budget Review</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>Finance Team - 9:15 AM</div>
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>Please review the attached...</div>
                </div>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
                  <div style={{ fontSize: "14px", fontWeight: "bold" }}>Client Presentation</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>Mike Chen - Yesterday</div>
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>Draft presentation ready for...</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, padding: "24px", background: "#fff" }}>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>Project Update Meeting</div>
                <div style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}>
                  From: Sarah Johnson &lt;sarah.johnson@company.com&gt;
                </div>
                <div style={{ fontSize: "14px", color: "#666", marginBottom: "16px" }}>To: Development Team</div>
              </div>
              <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
                <p>Hi everyone,</p>
                <p>
                  I hope this email finds you well. I wanted to reach out to schedule our weekly project sync meeting
                  for this week.
                </p>
                <p>Based on our current sprint progress, I think we should focus on:</p>
                <ul>
                  <li>Sprint review and retrospective</li>
                  <li>Upcoming feature prioritization</li>
                  <li>Technical debt discussion</li>
                  <li>Resource allocation for Q4</li>
                </ul>
                <p>Please let me know your availability for Thursday afternoon.</p>
                <p>
                  Best regards,
                  <br />
                  Sarah
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case "document":
      return (
        <div style={{ width: "100%", height: "100%", background: "#ffffff" }}>
          <div style={{ background: "#2b579a", color: "white", padding: "8px 16px", fontWeight: "bold" }}>
            Microsoft Word - Project Proposal.docx
          </div>
          <div
            style={{
              background: "#f1f3f4",
              padding: "8px",
              borderBottom: "1px solid #ddd",
              fontSize: "12px",
            }}
          >
            File | Home | Insert | Design | Layout | References | Mailings | Review | View
          </div>
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "40px",
              background: "#fff",
              minHeight: "calc(100% - 80px)",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
                Digital Transformation Initiative
              </h1>
              <h2 style={{ fontSize: "18px", color: "#666", marginBottom: "16px" }}>Project Proposal</h2>
              <div style={{ fontSize: "14px", color: "#888" }}>Prepared by: Technology Team | Date: December 2024</div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  color: "#2b579a",
                }}
              >
                Executive Summary
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "12px" }}>
                This document outlines our proposed digital transformation initiative aimed at modernizing our core
                business processes and improving operational efficiency. The project will focus on implementing new
                technologies that will enhance productivity, reduce costs, and improve customer satisfaction.
              </p>
              <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "12px" }}>
                Our analysis indicates that this initiative could result in a 25% improvement in operational efficiency
                and a projected ROI of 180% over the next three years.
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  color: "#2b579a",
                }}
              >
                Project Objectives
              </h3>
              <ul style={{ paddingLeft: "20px", fontSize: "14px", lineHeight: "1.6" }}>
                <li style={{ marginBottom: "8px" }}>Streamline workflow processes through automation</li>
                <li style={{ marginBottom: "8px" }}>Implement cloud-based infrastructure for better scalability</li>
                <li style={{ marginBottom: "8px" }}>Enhance data analytics capabilities</li>
                <li style={{ marginBottom: "8px" }}>Improve customer experience through digital channels</li>
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  color: "#2b579a",
                }}
              >
                Timeline and Budget
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
                The project is scheduled to begin in Q1 2025 with an estimated completion date of Q3 2025. Total budget
                requirement is $2.4M, allocated across infrastructure, software licensing, and professional services.
              </p>
            </div>
          </div>
        </div>
      );

    case "meeting":
      return (
        <div style={{ width: "100%", height: "100%", background: "#000" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flex: 1, position: "relative", background: "#1a1a1a" }}>
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  color: "white",
                  fontSize: "14px",
                  background: "rgba(0,0,0,0.5)",
                  padding: "8px 12px",
                  borderRadius: "4px",
                }}
              >
                Weekly Team Standup
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  color: "white",
                  fontSize: "12px",
                  background: "rgba(0,0,0,0.5)",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                🔴 Recording
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%", gap: "4px" }}>
                <div
                  style={{
                    background: "#2a2a2a",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: "#4a90e2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                      color: "white",
                    }}
                  >
                    👤
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      color: "white",
                      fontSize: "14px",
                      background: "rgba(0,0,0,0.7)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    Sarah Johnson
                  </div>
                </div>
                <div
                  style={{
                    background: "#2a2a2a",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: "#50c878",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                      color: "white",
                    }}
                  >
                    👤
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      color: "white",
                      fontSize: "14px",
                      background: "rgba(0,0,0,0.7)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    Mike Chen
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    🎤
                  </div>
                </div>
                <div
                  style={{
                    background: "#2a2a2a",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: "#ff6b6b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                      color: "white",
                    }}
                  >
                    👤
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      color: "white",
                      fontSize: "14px",
                      background: "rgba(0,0,0,0.7)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    You
                  </div>
                </div>
                <div
                  style={{
                    background: "#2a2a2a",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ color: "#888", fontSize: "16px" }}>
                    Alex Rivera
                    <br />
                    <span style={{ fontSize: "12px" }}>Camera Off</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <button
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "#ff4444",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  🎤
                </button>
                <button
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "#4444ff",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  📹
                </button>
                <button
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "#44ff44",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  💬
                </button>
                <button
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "#ff4444",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                  }}
                >
                  📞
                </button>
              </div>
            </div>
            <div style={{ width: "300px", background: "#2a2a2a", borderLeft: "1px solid #444" }}>
              <div
                style={{
                  padding: "16px",
                  color: "white",
                  fontSize: "14px",
                  borderBottom: "1px solid #444",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Chat</div>
              </div>
              <div style={{ padding: "16px", color: "#ccc", fontSize: "12px" }}>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ color: "#4a90e2", marginBottom: "4px" }}>Sarah Johnson 10:32 AM</div>
                  <div>Good morning everyone! Ready for standup?</div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ color: "#50c878", marginBottom: "4px" }}>Mike Chen 10:33 AM</div>
                  <div>Yes, I'll start with my updates</div>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ color: "#ff9500", marginBottom: "4px" }}>Alex Rivera 10:35 AM</div>
                  <div>👍 Ready when you are</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "monitoring":
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#1a1a1a",
            color: "#fff",
            fontFamily: "Consolas, monospace",
          }}
        >
          <div
            style={{
              background: "#333",
              padding: "8px 16px",
              borderBottom: "1px solid #555",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: "bold" }}>System Monitor - Production Server</div>
            <div style={{ fontSize: "12px", color: "#0f0" }}>● Online | Last Update: 12:34:56</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              padding: "16px",
              height: "calc(100% - 60px)",
            }}
          >
            <div style={{ background: "#2a2a2a", padding: "16px", borderRadius: "8px" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  color: "#4CAF50",
                }}
              >
                CPU Usage
              </div>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>68.3%</div>
              <div style={{ background: "#333", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ background: "#4CAF50", height: "100%", width: "68.3%" }}></div>
              </div>
              <div style={{ fontSize: "11px", color: "#888", marginTop: "8px" }}>Load avg: 2.14, 1.89, 1.76</div>
            </div>

            <div style={{ background: "#2a2a2a", padding: "16px", borderRadius: "8px" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  color: "#2196F3",
                }}
              >
                Memory Usage
              </div>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>12.4 GB / 16 GB</div>
              <div style={{ background: "#333", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ background: "#2196F3", height: "100%", width: "77.5%" }}></div>
              </div>
              <div style={{ fontSize: "11px", color: "#888", marginTop: "8px" }}>Available: 3.6 GB</div>
            </div>

            <div style={{ background: "#2a2a2a", padding: "16px", borderRadius: "8px" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  color: "#FF9800",
                }}
              >
                Network Activity
              </div>
              <div style={{ marginBottom: "8px" }}>
                <div style={{ fontSize: "12px", color: "#0f0" }}>▲ Upload: 245.8 MB/s</div>
                <div style={{ fontSize: "12px", color: "#f50" }}>▼ Download: 832.1 MB/s</div>
              </div>
              <div style={{ fontSize: "11px", color: "#888" }}>Total: 2.4 TB today</div>
            </div>

            <div style={{ background: "#2a2a2a", padding: "16px", borderRadius: "8px" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                  color: "#9C27B0",
                }}
              >
                Active Processes
              </div>
              <div style={{ fontSize: "11px", marginBottom: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>nginx</span>
                  <span style={{ color: "#4CAF50" }}>Running</span>
                </div>
              </div>
              <div style={{ fontSize: "11px", marginBottom: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>mysql</span>
                  <span style={{ color: "#4CAF50" }}>Running</span>
                </div>
              </div>
              <div style={{ fontSize: "11px", marginBottom: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>redis</span>
                  <span style={{ color: "#4CAF50" }}>Running</span>
                </div>
              </div>
              <div style={{ fontSize: "11px", marginBottom: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>node.js</span>
                  <span style={{ color: "#FF5722" }}>High CPU</span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              right: "16px",
              background: "#333",
              padding: "8px",
              borderRadius: "4px",
              fontSize: "11px",
            }}
          >
            <div style={{ color: "#4CAF50" }}>[12:34:56] System health check completed - All services operational</div>
            <div style={{ color: "#FF9800" }}>[12:34:45] Warning: High CPU usage detected on worker-node-3</div>
            <div style={{ color: "#4CAF50" }}>[12:34:32] Database backup completed successfully</div>
          </div>

          <style>
            {`
                                .blink {
                                    animation: blink 1s linear infinite;
                                }
                                @keyframes blink {
                                    0%, 50% { opacity: 1; }
                                    51%, 100% { opacity: 0; }
                                }
                            `}
          </style>
        </div>
      );

    default:
      return null;
  }
};
