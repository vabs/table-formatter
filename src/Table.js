import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './table.css';
import {
    FaPlus,
    FaMinus,
    FaDiscord,
    FaSlack,
    FaMarkdown,
} from 'react-icons/fa';

const Table = () => {
    const [columns, setColumns] = useState(['Column 1']);
    const [rows, setRows] = useState([['']]);
    const [headers, setHeaders] = useState(['Header 1']);

    const addColumn = () => {
        setColumns([...columns, `Column ${columns.length + 1}`]);
        setHeaders([...headers, `Header ${headers.length + 1}`]);
        setRows(rows.map((row) => [...row, '']));
    };

    const removeColumn = () => {
        if (columns.length > 1) {
            setColumns(columns.slice(0, -1));
            setHeaders(headers.slice(0, -1));
            setRows(rows.map((row) => row.slice(0, -1)));
        }
    };

    const addRow = () => {
        setRows([...rows, Array(columns.length).fill('')]);
    };

    const removeRow = () => {
        if (rows.length > 1) {
            setRows(rows.slice(0, -1));
        }
    };

    const handleCellChange = (rowIndex, colIndex, value) => {
        const newRows = rows.map((row, rIdx) =>
            row.map((cell, cIdx) =>
                rIdx === rowIndex && cIdx === colIndex ? value : cell
            )
        );
        setRows(newRows);
    };

    const handleHeaderChange = (index, value) => {
        const newHeaders = headers.map((header, hIdx) =>
            hIdx === index ? value : header
        );
        setHeaders(newHeaders);
    };

    const copyToMarkdown = () => {
        let markdown = '| ' + headers.join(' | ') + ' |\n';
        markdown += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
        rows.forEach((row) => {
            markdown += '| ' + row.join(' | ') + ' |\n';
        });
        navigator.clipboard.writeText(markdown).then(() => {
            toast.success('Table copied to clipboard in Markdown format!');
        });
    };

    const copyForMessagingPlatform = () => {
        const columnWidths = headers.map((header, index) => {
            const maxCellLength = Math.max(
                ...rows.map((row) => row[index].length)
            );
            return Math.max(header.length, maxCellLength);
        });

        const createRow = (row) => {
            return (
                '| ' +
                row
                    .map((cell, index) => cell.padEnd(columnWidths[index], ' '))
                    .join(' | ') +
                ' |'
            );
        };

        const createSeparator = () => {
            return (
                '+-' +
                columnWidths.map((width) => '-'.repeat(width)).join('-+-') +
                '-+'
            );
        };

        let slackFormat = createSeparator() + '\n';
        slackFormat += createRow(headers) + '\n';
        slackFormat += createSeparator() + '\n';
        rows.forEach((row) => {
            slackFormat += createRow(row) + '\n';
        });
        slackFormat += createSeparator();

        navigator.clipboard.writeText(slackFormat).then(() => {
            toast.success('Table copied to clipboard!');
        });
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey) {
                if ('arsdmlk'.indexOf(event.key) !== -1) { event.preventDefault(); }
                switch (event.key) {
                    case 'a':
                        addColumn();
                        break;
                    case 'r':
                        removeColumn();
                        break;
                    case 's':
                        addRow();
                        break;
                    case 'd':
                        removeRow();
                        break;
                    case 'm':
                        copyToMarkdown();
                        break;
                    case 'l':
                    case 'k':
                        copyForMessagingPlatform();
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [columns, rows, headers]);

    return (
        <div className="table-container">
            <h1>Table Formatter</h1>
            <div className="button-row">
                <button onClick={addColumn}>
                    <FaPlus /> Add Column (Ctrl + A)
                </button>
                <button onClick={removeColumn}>
                    <FaMinus /> Remove Column (Ctrl + R)
                </button>
                <button onClick={addRow}>
                    <FaPlus /> Add Row (Ctrl + S)
                </button>
                <button onClick={removeRow}>
                    <FaMinus /> Remove Row (Ctrl + D)
                </button>
            </div>
            <div className="button-row">
                <button
                    className="copy-button"
                    onClick={copyForMessagingPlatform}
                >
                    <FaSlack /> Copy to Slack (Ctrl + L)
                </button>
                <button
                    className="copy-button"
                    onClick={copyForMessagingPlatform}
                >
                    <FaDiscord /> Copy to Discord (Ctrl + K)
                </button>
                <button className="copy-button" onClick={copyToMarkdown}>
                    <FaMarkdown /> Copy to Markdown (Ctrl + M)
                </button>
            </div>
            <table className="styled-table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>
                                <input
                                    type="text"
                                    value={header}
                                    onChange={(e) =>
                                        handleHeaderChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>
                                    <textarea
                                        value={cell}
                                        onChange={(e) =>
                                            handleCellChange(
                                                rowIndex,
                                                colIndex,
                                                e.target.value
                                            )
                                        }
                                        rows="2"
                                        cols="40"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default Table;
