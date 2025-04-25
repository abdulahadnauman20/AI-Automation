import { useState } from "react"
import { ChevronDown, Eye, Share2, Plus, X } from "lucide-react"
import { Editor } from '@tinymce/tinymce-react'; // Import TinyMCE Editor

export default function EmailTemplateBuilder() {
  const [subject, setSubject] = useState("Boost {company}'s Sales with Smart Lead Management 🚀");
  const[selectStep, setSelectStep]  = useState(null);
  const [steps, setSteps] = useState([
    { id: 1, value: "Boost {company}'s Sales with Smart Lead Management" }
  ]) 

  const [content, setContent] = useState(`
    <p>Hi {user},</p>
    <p>Growing a small business is challenging, and keeping track of leads shouldn't slow you down. 
    That's why Quickpipe AI helps businesses like {company} stay organized, automate follow-ups, 
    and close deals faster—all in one place.</p>
    <p>With integrations for Slack, Salesforce, Google Calendar, and more, Quickpipe AI ensures you 
    never miss an opportunity. Ready to scale your sales without the hassle? Try Quickpipe AI today 
    and see the difference!</p>
    <p><a href="#" style="color: #3b82f6;">[Start Your Free Trial]</a></p>
    <p>Best,<br>The Quickpipe AI Team</p>
  `)

  const addStep = () => {
    if (steps.length < 3) {
      setSteps([...steps, { id: steps.length + 1, value: "" }]) // Add new step
    }
  }

  const deleteStep = (id) => {
    setSteps(steps.filter(step => step.id !== id)) // Remove the step with the matching id
  }

  const handleStepChange = (id, value) => {
    setSteps(steps.map(step => step.id === id ? { ...step, value } : step)) // Update the value of a specific step
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-80 p-4 flex flex-col gap-4">
        {steps.map((step) => (
          <div key={step.id} onClick={() => setSelectStep(step.id)} className={`p-4 border rounded-lg cursor-pointer 
            ${selectStep === step.id ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}>
            <div className="flex justify-between items-center my-2">
                <p className="font-semibold">Day1</p>
                <button
                onClick={() => deleteStep(step.id)}
                className="text-red-500 ml-2 cursor-pointer"
                >
                <X size={16} />
                </button>
            </div>
            <hr className="my-2 text-gray-300" />
            <input
              type="text"
              value={step.value}
              onChange={(e) => handleStepChange(step.id, e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder={`Step ${step.id}`}
            />
          </div>
        ))}

        <button
          onClick={addStep}
          disabled={steps.length >= 3}
          className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-100 transition-colors border-dashed"
        >
          <Plus size={16} />
          <span className="cursor-pointer">Add step</span>
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 border-l border-gray-200 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Subject and Action Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-700 text-sm">
              <span className="font-medium">Subject: </span>
              {subject}
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-teal-500 text-teal-500 hover:bg-teal-50 text-sm rounded flex items-center gap-1">
                <Eye size={16} />
                <span>Preview</span>
              </button>
              <button className="p-2 border border-gray-300 text-gray-500 rounded hover:bg-gray-100">
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* TinyMCE Editor */}
          <div className="mb-6">
            <Editor
              apiKey="your-api-key-here" // You need to set your TinyMCE API key here
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
              }}
            />
          </div>

          {/* AI Write Button */}
          <div className="flex justify-end mb-4">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#f0f9f4] rounded-full text-sm text-teal-600">
              Write with AI <span className="text-yellow-400 ml-1">✨</span>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded flex items-center text-sm">
              Save
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
