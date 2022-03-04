import Head from 'next/head'
import Header from '../components/Header'
import Button from '@material-tailwind/react/Button'
import React, { useState } from 'react'
import Icon from '@material-tailwind/react/Icon'
import Image from 'next/image'
import { getSession, useSession } from 'next-auth/react'
import Login from '../components/Login'
import Modal from '@material-tailwind/react/Modal'
import ModalHeader from '@material-tailwind/react/ModalHeader'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import DocumentRow from '../components/DocumentRow'

const Home = ({ contextSession }) => {
  // const { data: session } = useSession()
  // console.log(contextSession)
  if (!contextSession) return <Login />

  const [showModal, setShowModal] = useState(false)
  const [input, setInput] = useState('')
  //firebase hook
  const [snapshot, loading, error] = useCollection(
    query(
      collection(db, 'userDocs', contextSession.user.email, 'docs'),
      orderBy('timestamp', 'desc')
    )
  )

  //create document
  const createDocument = async () => {
    if (!input) return

    await addDoc(
      collection(db, 'userDocs', contextSession.user.email, 'docs'),
      {
        fileName: input,
        timestamp: serverTimestamp(),
      }
    )

    setInput('')
    setShowModal(false)
  }

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      {/* <ModalHeader toggler={() => setShowModal(false)}>Modal Title</ModalHeader> */}
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="w-full outline-none"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === 'Enter' && createDocument}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <div className="">
      <Head>
        <title>Google Drive Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section className="bg-[#FAF9FA] px-10 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-lg text-gray-700">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0 "
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>

          <div>
            <div
              onClick={(e) => setShowModal(true)}
              className="relative h-52 w-40 cursor-pointer border-2 hover:border-blue-500"
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 text-sm font-semibold text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 ">
        <div className="text-gray mx-auto max-w-3xl py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="text-medium flex-1">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>
        {/* {console.log(snapshot.docs)} */}
        <div className="mx-auto max-w-3xl">
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
      {modal}
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const session = await getSession(context)
  // console.log(session)
  return {
    props: {
      contextSession: session,
    },
  }
}
