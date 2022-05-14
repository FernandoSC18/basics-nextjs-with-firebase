import Head from 'next/head'
import Link from 'next/link'
import React, {useEffect} from 'react'  

import firebaseManage from '../firebase/firebase_manage.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card, CardTitle, CardText, Row, Progress, Spinner } from 'reactstrap';


export default function Blog() {

    const [posts, setPosts] = React.useState([])

    const getAllPosts = async () => { 

        const allPosts = await firebaseManage.getAllPosts()
        setPosts(allPosts) 
        
    }
    getAllPosts();
 
    const HeadData = () => {
        
        return <Head>
          <title>Blog</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" /> 
          <meta name="description" content="Blog" />
          <meta name="keywords" content="Blog" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      
    }  
 
    const CardLoading = () => { 
        return <Spinner color="secondary"
        type="grow" 
        style={{height: '20vh', borderRadius:'5px', margin: '20px 0', width: '100%'}}/> 
    }  
    
    const listPosts = posts.length > 0 ? posts.map((post, index)=> {
        
        return <div key={post.document_id} >
                <Link href={`/blog/${post.document_id}`}> 
                    <div>
                        <Card body
                        color="secondary"
                        inverse style={{margin: '20px 0' }}>
                            <CardTitle tag="h5">
                                {post.title}
                            </CardTitle>
                            <CardText> 
                                {post.paragraph}
                            </CardText> 
                        </Card> 
                    </div>
                </Link>
            </div>

    }) : <div>
        <CardLoading/>
        <CardLoading/>
        <CardLoading/>
    </div>

    return <>

        <HeadData/> 
        
        <Container> 
            <br /> 
            <br />
            <CardTitle tag="h5">
                Articulos de Blog
            </CardTitle> 
            
            {listPosts}

        </Container>  
    
    </>
}