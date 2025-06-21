import React from 'react';

const SpreadsheetApp: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#ffffff' }}>
      <div
        style={{
          background: '#217346',
          color: 'white',
          padding: '8px 16px',
          fontWeight: 'bold',
        }}
      >
        Microsoft Excel - Q4 Budget Analysis
      </div>
      <div
        style={{
          background: '#f8f9fa',
          padding: '8px',
          borderBottom: '1px solid #ddd',
          fontSize: '12px',
        }}
      >
        File | Home | Insert | Page Layout | Formulas | Data | Review | View
      </div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '30px',
            background: '#f1f3f4',
            borderRight: '1px solid #ddd',
          }}
        >
          <div
            style={{ height: '20px', borderBottom: '1px solid #ddd' }}
          ></div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              style={{
                height: '25px',
                borderBottom: '1px solid #ddd',
                textAlign: 'center',
                fontSize: '11px',
                paddingTop: '4px',
              }}
            >
              {i}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              height: '20px',
              background: '#f1f3f4',
              borderBottom: '1px solid #ddd',
            }}
          >
            {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((col) => (
              <div
                key={col}
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  textAlign: 'center',
                  fontSize: '11px',
                  paddingTop: '2px',
                }}
              >
                {col}
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                display: 'flex',
                height: '25px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                Category
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                Q1
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                Q2
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                Q3
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                Q4
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                Total
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                height: '25px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                }}
              >
                Revenue
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                }}
              >
                $125,000
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                }}
              >
                $134,500
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                }}
              >
                $142,300
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                }}
              >
                $158,900
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                $560,700
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                height: '25px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                }}
              >
                Expenses
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                }}
              >
                $89,200
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                }}
              >
                $92,100
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                }}
              >
                $95,800
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                }}
              >
                $98,700
              </div>
              <div
                style={{
                  width: '80px',
                  borderRight: '1px solid #ddd',
                  padding: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
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
};

export default SpreadsheetApp;