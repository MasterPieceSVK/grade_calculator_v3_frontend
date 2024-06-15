export default function Page() {
  return (
    <main className="bg-base-100 text-black">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Grade</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>
                <input
                  type="number"
                  defaultValue="85"
                  className="input input-ghost w-full max-w-xs"
                />
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>
                <input
                  type="number"
                  defaultValue="70"
                  className="input input-ghost w-full max-w-xs"
                />
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>
                <input
                  type="number"
                  defaultValue="50"
                  className="input input-ghost w-full max-w-xs"
                />
              </td>
            </tr>
            <tr>
              <th>4</th>
              <td>
                <input
                  type="number"
                  defaultValue="30"
                  className="input input-ghost w-full max-w-xs"
                />
              </td>
            </tr>
            <tr>
              <th>5</th>
              <td>
                <input
                  type="number"
                  defaultValue="0"
                  className="input input-ghost w-full max-w-xs"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
