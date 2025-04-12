import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FaUser, FaShoppingCart, FaStar, FaBoxOpen } from 'react-icons/fa';
import { Card, CardContent } from '@mui/material';

const data = [
  { name: '2013', value: 25.9 },
  { name: '2014', value: 30.3 },
  { name: '2015', value: 17.1 },
  { name: '2016', value: 26.7 },
];

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

const Test = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-green-500">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg">Total Users</h3>
                <p className="text-3xl font-bold">277</p>
                <p>Last Month</p>
              </div>
              <FaUser size={40} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-pink-500">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg">Total Orders</h3>
                <p className="text-3xl font-bold">277</p>
                <p>Last Month</p>
              </div>
              <FaShoppingCart size={40} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg">Total Products</h3>
                <p className="text-3xl font-bold">277</p>
                <p>Last Month</p>
              </div>
              <FaBoxOpen size={40} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg">Total Reviews</h3>
                <p className="text-3xl font-bold">277</p>
                <p>Last Month</p>
              </div>
              <FaStar size={40} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-lg mb-4">Total Sales</h3>
            <p className="text-3xl font-bold">$3,787,681.00</p>
            <p>$3,578.90 in last month</p>
            <PieChart width={400} height={300}>
              <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-lg mb-4">Best Selling Products</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2">Product</th>
                    <th className="border-b p-2">Category</th>
                    <th className="border-b p-2">Brand</th>
                    <th className="border-b p-2">Price</th>
                    <th className="border-b p-2">Stock</th>
                    <th className="border-b p-2">Rating</th>
                    <th className="border-b p-2">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">Tops and skirt set</td>
                    <td className="p-2">Women</td>
                    <td className="p-2">Richman</td>
                    <td className="p-2">$21.00</td>
                    <td className="p-2">In Stock</td>
                    <td className="p-2">4.9 ★</td>
                    <td className="p-2">$38k</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Test;
