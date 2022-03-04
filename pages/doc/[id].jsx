import React from 'react'
import TextEditor from '../../components/TextEditor'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useRouter } from 'next/router'
import { db } from '../../firebase'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'
import { getSession, signOut, useSession } from 'next-auth/react'
import Login from '../../components/Login'
import { doc } from 'firebase/firestore'

const Doc = ({ contextSession }) => {
  //   const { data: session } = useSession()
  if (!contextSession) return <Login />

  const router = useRouter()
  const { id } = router.query
  const [snapshot, loading, error] = useDocumentOnce(
    doc(db, 'userDocs', contextSession.user.email, 'docs', id)
  )

  // Redirect if user tries to access a URL they do not have access to ...
  if (!loading && !snapshot?.data()?.fileName) {
    router.replace('/')
  }

  return (
    <div>
      <header className="flex items-center justify-between p-3 pb-1">
        <span onClick={() => router.push('/')} className="cursor-pointer">
          <Icon name="description" size="5xl" color="blue" />
        </span>
        <div className="flex-1 px-2">
          <h2>{snapshot?.data()?.fileName}</h2>
          <div className="-ml-1 flex h-8 items-center space-x-1 text-sm text-gray-500">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>

        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          className="hidden h-10 md:inline-flex"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
        >
          <Icon name="people" size="md" /> SHARE
        </Button>

        <img
          className="ml-2 h-12 w-12 cursor-pointer rounded-full"
          src={contextSession.user.image}
          alt=""
        />
      </header>
      <TextEditor id={id} session={contextSession} />
    </div>
  )
}

export default Doc

export async function getServerSideProps(context) {
  const session = await getSession(context)
  // console.log(session)
  return {
    props: {
      contextSession: session,
    },
  }
}
