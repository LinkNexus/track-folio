import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

const DocumentVerification = () => {
    return (
        <Card className="border shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Document Verification</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Upload your identification documents
                </p>
                <div className="border-2 border-dashed rounded-md p-8 text-center">
                    <div className="mx-auto flex flex-col items-center justify-center">
                        <upload className="h-10 w-10 text-muted-foreground mb-4"/>
                        <p className="text-sm text-muted-foreground mb-1">Drag and drop your documents here</p>
                        <Button variant="default" className="mt-4">
                            Select Files
                        </Button>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: PDF, JPG, PNG (max 10MB)
                </p>
            </CardContent>
        </Card>
    );
};

export default DocumentVerification;
