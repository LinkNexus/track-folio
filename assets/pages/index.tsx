import React from 'react';
import Header from '@/components/Header';
import SummaryCard from '@/components/SummaryCard';
import PortfolioChart from '@/components/PortfolioChart';
import AssetDistribution from '@/components/AssetDistribution';
import DocumentVerification from '@/components/DocumentVerification';
import TransactionHistory from '@/components/TransactionHistory';
import ProfileSettings from '@/components/ProfileSettings';

const Index = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header/>
            <main className="container py-6 px-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <SummaryCard
                        title="Total Balance"
                        value="$128,560.89"
                        change="+12.5%"
                        isPositive={true}
                    />
                    <SummaryCard
                        title="Total Assets"
                        value="$142,780.00"
                        subtitle="4 Asset Types"
                    />
                    <SummaryCard
                        title="Total Gains"
                        value="$14,219.11"
                        change="+11.05%"
                        isPositive={true}
                    />
                    <SummaryCard
                        title="YTD Return"
                        value="18.24%"
                        subtitle="This Year"
                        isPositive={true}
                    />
                </div>

                {/* Portfolio Chart */}
                <div className="mb-6">
                    <PortfolioChart/>
                </div>

                {/* Asset Distribution and Document Verification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <AssetDistribution/>
                    <DocumentVerification/>
                </div>

                {/* Transaction History */}
                <div className="mb-6">
                    <TransactionHistory/>
                </div>

                {/* Profile Settings */}
                <div className="mb-6">
                    <ProfileSettings/>
                </div>
            </main>
        </div>
    );
};

export default Index;
