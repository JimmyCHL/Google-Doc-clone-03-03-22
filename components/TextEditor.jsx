import dynamic from 'next/dynamic' //it is used to lazy load component
import React, { useState, useEffect } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'

//this would solve the 'window is not defined issue'
//render in client side not in server side.
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
)

const TextEditor = ({ id, session }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [saveTime, setSaveTime] = useState('loading')

  const [snapshot, loading, error] = useDocumentOnce(
    doc(db, 'userDocs', session.user.email, 'docs', id)
  )

  //set Editor content and save setSaveTime
  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot.data().editorState)
        )
      )
    }

    if (snapshot?.data()?.lastSavedTime) {
      setSaveTime(snapshot.data().lastSavedTime.toDate().toLocaleString())
    }

    if (!snapshot?.data()?.lastSavedTime && !loading) {
      setSaveTime('No previous record')
    }

    if (loading) {
      setSaveTime('loading')
    }
  }, [snapshot])

  // set State for Editor
  const onEditorStateChange = async (editorState) => {
    setEditorState(editorState)

    setSaveTime('loading')

    await updateDoc(doc(db, 'userDocs', session.user.email, 'docs', id), {
      editorState: convertToRaw(editorState.getCurrentContent()),
      lastSavedTime: serverTimestamp(),
    })

    setSaveTime(new Date().toLocaleString())
  }

  //load time
  const loadTime = (saveTime) => {
    switch (saveTime) {
      case 'loading':
        return 'loading...'
        break
      case 'No previous record':
        return 'No previous record...'
        break
      default:
        return 'Last saved time: ' + saveTime
        break
    }
  }
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16 ">
      <Editor
        editorState={editorState}
        toolbarClassName="flex sticky top-0 z-50 !justify-center !mx-auto"
        editorClassName="mt-6 mx-4 lg:mx-auto bg-white shadow-lg max-w-6xl mb-12 border p-6"
        onEditorStateChange={onEditorStateChange}
      />
      <p className="text-bold fixed bottom-0 left-0 right-0 text-center font-bold text-gray-600">
        {loadTime(saveTime)}
      </p>
    </div>
  )
}

export default TextEditor
