import React from "react";

export default function PageHeader({ title, breadcrumbs }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
      {breadcrumbs && (
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-gray-400">/</span>}
              <a href={crumb.href} className="text-blue-600 hover:underline">
                {crumb.label}
              </a>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
