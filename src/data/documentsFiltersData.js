export const filters = [
  { id: "All Documents", label: "All Documents", count: 12 },
  { id: "My Documents", label: "My Documents", count: 6 },
  { id: "Shared with me", label: "Shared with me", count: 4 },
  { id: "Shares", label: "Shares", count: 2 },
];
export const tableData = [1, 2, 3, 4, 5].map((_, index) => ({
  id: index,
  title: "Data Privacy & Security Compliance Certificate",
  ext: "ng",
  category: "Projects",
  owner: "Emp Test",
  size: "261.19 KB",
  version: "1",
  status: "active",
  access: "private",
}));

export const sharesData = [
  {
    id: 1,
    doc: "Project Alpha Specification",
    sharedWith: "7",
    sharedBy: "Emp Test",
    perms: "Download",
    expires: "Jan 17, 2026",
    accessed: "0 times",
  },
  {
    id: 2,
    doc: "Project Alpha Specification",
    sharedWith: "HR User",
    sharedBy: "Emp Test",
    perms: "Download",
    expires: "Jan 17, 2026",
    accessed: "0 times",
  },
];
