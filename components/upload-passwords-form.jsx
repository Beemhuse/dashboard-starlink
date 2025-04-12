"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Upload, File, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function UploadPasswordsForm({ areaId }) {
  const router = useRouter()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setError(null)
    setUploadComplete(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!file) {
      setError("Please select a file to upload.")
      return
    }

    // Check file type (should be CSV or TXT)
    if (!file.name.endsWith(".csv") && !file.name.endsWith(".txt")) {
      setError("Please upload a CSV or TXT file.")
      return
    }

    setUploading(true)
    setError(null)

    // Simulate upload process
    setTimeout(() => {
      setUploading(false)
      setUploadComplete(true)

      // In a real app, you would send this data to your API
      console.log({
        areaId,
        file,
      })

      // Navigate to manage page after a delay
      setTimeout(() => {
        router.push(`/service-areas/${areaId}/passwords?tab=manage`)
      }, 2000)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Passwords</CardTitle>
        <CardDescription>Upload a CSV or TXT file containing passwords for this service area.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password-file">Password File</Label>
            <Input
              id="password-file"
              type="file"
              accept=".csv,.txt"
              onChange={handleFileChange}
              disabled={uploading || uploadComplete}
            />
            <p className="text-sm text-muted-foreground">Upload a CSV or TXT file with one password per line.</p>
          </div>

          {file && (
            <div className="flex items-center gap-2 text-sm">
              <File className="h-4 w-4" />
              <span>{file.name}</span>
              <span className="text-muted-foreground">({(file.size / 1024).toFixed(2)} KB)</span>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {uploadComplete && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Upload Complete</AlertTitle>
              <AlertDescription>Your passwords have been successfully uploaded.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/service-areas/${areaId}/passwords?tab=manage`)}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!file || uploading || uploadComplete}>
            {uploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Passwords
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
