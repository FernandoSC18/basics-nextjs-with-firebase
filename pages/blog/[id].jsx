import firebaseManage from '../../firebase/firebase_manage.js';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardText, CardTitle, Container } from 'reactstrap';

export default function Post(props) {
 
    var post = {};
    var dateParsed = '';
    if (props.post != null){
        post = JSON.parse(props.post)
        dateParsed = secondsToDateTime(post.created_date.seconds)
    }   
 
    function secondsToDateTime(secs) { 
        var t = new Date(0);
        t.setSeconds(secs) 
        return t;
    }

    
    const MESES = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];


    const HeadData = () => {
        
        return <Head>
          <title>{post.title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" /> 
          <meta name="description" content={post.title} />
          <meta name="keywords" content={post.title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      
    }  

    return <Container> 
        <HeadData/>
        <br />
        <Card body >
            <CardBody>
            <CardTitle tag="h5">
                {post.title}
            </CardTitle> 
            <CardText> 
                {`Creado el 
                ${dateParsed.getDate()} de ${MESES[dateParsed.getMonth()]} de ${dateParsed.getFullYear()}
                por ${post.created_by}`}
            </CardText> 
            </CardBody>
        </Card>
        
        <br />

        <CardBody> 
            <CardText>
                {post.paragraph}
            </CardText> 
            <CardText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non mollitia minima excepturi totam sequi sit. Blanditiis aperiam praesentium, beatae voluptatibus, aliquid dolor tenetur quisquam voluptate delectus illum ducimus velit!
            </CardText> 
        </CardBody>
    </Container>

}


export async function getStaticPaths() {  
    const pathsArray = [];
    const paths = await firebaseManage.getAllPosts()

    paths.forEach(element => { 
        pathsArray.push({ 
            params: { id: element.document_id } 
        })  
    }); 

    return { paths: pathsArray , fallback: true };

} 

export async function getStaticProps({ params }) { 
    const post = await firebaseManage.getPostById(params.id)
    
    const staticProps = {
        post: JSON.stringify(post)
    } 
 
    return { props: staticProps}
} 
 